import React, { useState, useRef } from 'react';
import { Form, Grid, Header, Input } from 'semantic-ui-react';
import { TxButton } from './substrate-lib/components';
import BN from 'bn.js';
import { loadSpendableAssets, persistSpendableAssets } from './utils/Persistence';

export default function Main ({ accountPair, wasm }) {
  const [status, setStatus] = useState(null);
  const [formState, setFormState] = useState({ assetId: null, mintAmount: new BN(1) });
  const onChange = (_, data) => {
    setFormState(prev => ({ ...prev, [data.state]: data.value }));
  };
  const { assetId, mintAmount } = formState;
  let mintAsset = useRef(null);

  const generateMintPayload = () => {
    mintAsset = wasm.generate_asset_for_browser(new Uint8Array(32).fill(0), assetId, mintAmount);
    const mintInfo = wasm.generate_mint_payload_for_browser(mintAsset);
    return mintInfo;
  };

  const onMintSuccess = () => {
    const spendableAssets = loadSpendableAssets();
    spendableAssets.push(mintAsset);
    persistSpendableAssets(spendableAssets);
    mintAsset = null;
  };

  const onMintFailure = () => {
    mintAsset = null;
  };

  const buttonDisabled = (status && status.isProcessing()) || !assetId || !mintAmount;
  const formDisabled = status && status.isProcessing();

  return (
    <>
      <Grid.Column width={2}/>
      <Grid.Column width={10}>
        <Header textAlign='center'>Mint Private Asset</Header>
        <Form>
          <Form.Field style={{ width: '500px', marginLeft: '2em' }}>
            <Input
              fluid
              label='Asset ID'
              type='number'
              state='assetId'
              onChange={onChange}
              disabled={formDisabled}
            />
          </Form.Field>
          <Form.Field style={{ width: '500px', marginLeft: '2em' }}>
            <Input
              fluid
              label='Amount'
              type='number'
              state='mintAmount'
              value={1}
              disabled={true}
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
                  callable: 'mintPrivateAsset',
                  inputParams: generateMintPayload,
                  paramFields: [true],
                  onSuccess: onMintSuccess,
                  onFailure: onMintFailure
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
