import React, { useState, useEffect, useRef } from 'react';
import { Form, Grid, Header, Input } from 'semantic-ui-react';
import { TxButton } from './substrate-lib/components';
import { useSubstrate } from './substrate-lib';
import { base64Decode } from '@polkadot/util-crypto';
import MantaAsset from './dtos/MantaAsset';
import _ from 'lodash';
import { loadSpendableAssetsById, loadSpendableAssets, persistSpendableAssets } from './utils/Persistence';

export default function Main ({ accountPair, wasm }) {
  // now
  // todo: automatically generate proving keys on startup
  // todo: fix memory leak / pages shouldn't reset on switching labs page
  // todo: use manta asset type everywhere
  // todo: ledger state dto
  
  // later
  // todo: generate new private keys and save in local storage / remove hardcoded keys
  // todo: poll assets we have received
  // todo: check that coins actually exist on startup (maybe they were spent on different computer)
  // todo: store pending spends
  // todo: cleanup folder structure
  // todo: address derivation / change
  // todo: make amount configurable / coin selection

  const { api } = useSubstrate();
  const [status, setStatus] = useState(null);
  const [transferPK, setTransferPK] = useState(null);
  const [formState, setFormState] = useState({ address1: '', address2: '', amount: 0, assetId: null });
  const onChange = (_, data) => setFormState(prev => ({ ...prev, [data.state]: data.value }));
  const { address1, address2, assetId } = formState;

  let selectedAsset1 = useRef(null);
  let selectedAsset2 = useRef(null);

  useEffect(() => {
    const request = new XMLHttpRequest();
    request.open('GET', 'transfer_pk.bin', true);
    request.responseType = 'blob';
    request.onreadystatechange = async () => {
      if (request.readyState === 4) {
        const fileContent = request.response;
        const fileContentBuffer = await fileContent.arrayBuffer();
        const transferPK = new Uint8Array(fileContentBuffer);
        setTransferPK(transferPK);
      }
    };
    request.send(null);
  }, []);

  const getLedgerState = async asset => {
    const shardIndex = new MantaAsset(asset).utxo[0];
    const shards = await api.query.mantaPay.coinShards();
    return shards.shard[shardIndex].list;
  };

  const generatePrivateTransferPayload = async () => {
    const spendableAssets = loadSpendableAssetsById(assetId);
    selectedAsset1 = spendableAssets[0];
    selectedAsset2 = spendableAssets[1];
    let ledgerState1 = await getLedgerState(selectedAsset1);
    let ledgerState2 = await getLedgerState(selectedAsset2);
    // flatten (wasm only accepts flat arrays)
    ledgerState1 = Uint8Array.from(ledgerState1.reduce((a, b) => [...a, ...b], []));
    ledgerState2 = Uint8Array.from(ledgerState2.reduce((a, b) => [...a, ...b], []));
    return wasm.generate_private_transfer_payload_for_browser(
      selectedAsset1,
      selectedAsset2,
      ledgerState1,
      ledgerState2,
      transferPK,
      base64Decode(address1.trim()),
      base64Decode(address2.trim())
    );
  };

  const onPrivateTransferSuccess = () => {
    const spendableAssets = loadSpendableAssets()
      .filter(asset => !_.isEqual(asset, selectedAsset1) && !_.isEqual(asset, selectedAsset2));
    persistSpendableAssets(spendableAssets);

    selectedAsset1 = null;
    selectedAsset2 = null;
  };

  const onPrivateTransferFailure = () => {
    selectedAsset1 = null;
    selectedAsset2 = null;
  };

  const formDisabled = status && status.isProcessing();

  const buttonDisabled = (
    (status && status.isProcessing()) || !address1 || !address2 || !assetId
  );

  return (
    <>
      <Grid.Column width={2}/>
      <Grid.Column width={12} textAlign='center'>
        <Header textAlign='center'>Private Transfer</Header>
        <Form>
          <Form.Field style={{ width: '500px', marginLeft: '2em' }}>
            <Input
              fluid
              disabled={formDisabled}
              label='Asset ID'
              type='number'
              state='assetId'
              onChange={onChange}
            />
          </Form.Field>
          <Form.Field style={{ width: '500px', marginLeft: '2em' }}>
            <Input
              fluid
              disabled={formDisabled}
              label='Address 1'
              type='string'
              state='address1'
              onChange={onChange}
            />
          </Form.Field>
          <Form.Field style={{ width: '500px', marginLeft: '2em' }}>
            <Input
              fluid
              disabled={formDisabled}
              label='Address 2'
              type='string'
              state='address2'
              onChange={onChange}
            />
          </Form.Field>
          <Form.Field style={{ width: '500px', marginLeft: '2em' }}>
            <Input
              fluid
              disabled={true}
              label='Amount 1'
              type='number'
              state='amount1'
              value={1}
            />
          </Form.Field>
          <Form.Field style={{ width: '500px', marginLeft: '2em' }}>
            <Input
              fluid
              disabled={true}
              label='Amount 2'
              type='number'
              state='amount2'
              value={1}
            />
          </Form.Field>
          <Form.Field style={{ textAlign: 'center' }}>
            <TxButton
              accountPair={accountPair}
              label='Submit'
              type='SIGNED-TX'
              setStatus={setStatus}
              disabled={buttonDisabled}
              attrs={{
                palletRpc: 'mantaPay',
                callable: 'privateTransfer',
                inputParams: generatePrivateTransferPayload,
                paramFields: [true],
                onSuccess: onPrivateTransferSuccess,
                onFailure: onPrivateTransferFailure
              }}
            />
          </Form.Field>
          <div style={{ overflowWrap: 'break-word' }}>{status && status.toString()}</div>
        </Form>
      </Grid.Column>
      <Grid.Column width={2}/>
    </>
  );
}
