import React, { useState } from 'react';
import { Form, Input, Grid, Header } from 'semantic-ui-react';
import { TxButton } from './substrate-lib/components';
import MAToAtomicUnits from './utils/MAToAtomicUnit';

export default function Main (props) {
  const [status, setStatus] = useState(null);
  const [formState, setFormState] = useState({ addressTo: null, amount: 0 });
  const { accountPair } = props;
  const onChange = (_, data) =>
    setFormState(prev => ({ ...prev, [data.state]: data.value }));
  const { addressTo, amount } = formState;

  return (
    <Grid.Column width={8}>
      <Header textAlign='center'>Transfer MA Token</Header>
      <Form>
        <Form.Field style={{ width: '500px', textAlign: 'center', marginLeft: '2em' }}>
          <Input
            fluid
            label='To'
            type='text'
            placeholder='address'
            state='addressTo'
            onChange={onChange}
          />
        </Form.Field>
        <Form.Field style={{ width: '500px', marginLeft: '2em' }}>
          <Input
            fluid
            label='Amount'
            type='number'
            placeholder='MA'
            state='amount'
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
              palletRpc: 'balances',
              callable: 'transfer',
              inputParams: [addressTo, MAToAtomicUnits(amount)],
              paramFields: [true, true]
            }}
          />
        </Form.Field>
        <div style={{ overflowWrap: 'break-word' }}>{status && status.toString()}</div>
      </Form>
    </Grid.Column>
  );
}
