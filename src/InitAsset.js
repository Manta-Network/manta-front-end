import React, { useState } from 'react';
import { Form, Grid, Header, Input } from 'semantic-ui-react';
import { TxButton } from './substrate-lib/components';

export default function Main ({ accountPair }) {
  const [status, setStatus] = useState(null);
  const [formState, setFormState] = useState({ assetID: null, mintAmount: 0 });
  const onChange = (_, data) =>
    setFormState(prev => ({ ...prev, [data.state]: data.value }));
  const { assetID, mintAmount } = formState;

  return (
    <>
      <Grid.Column width={2}/>
      <Grid.Column width={10}>
        <Header textAlign='center'>Init Asset</Header>
        <Form>
          <Form.Field style={{ width: '500px', marginLeft: '2em' }}>
            <Input
              fluid
              label='Asset ID'
              type='number'
              state='assetID'
              onChange={onChange}
            />
          </Form.Field>
          <Form.Field style={{ width: '500px', marginLeft: '2em' }}>
            <Input
              fluid
              label='Total Supply'
              type='number'
              state='mintAmount'
              onChange={onChange}
            />
          </Form.Field>
            <Form.Field style={{ textAlign: 'center' }}>
              <TxButton
                accountPair={accountPair}
                label='Submit'
                type='SIGNED-TX'
                setStatus={setStatus}
                attrs={{
                  palletRpc: 'mantaPay',
                  callable: 'initAsset',
                  inputParams: [assetID, mintAmount],
                  paramFields: [true, true]
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
