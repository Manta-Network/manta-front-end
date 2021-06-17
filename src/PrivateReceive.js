import React, { useState } from 'react';
import { Grid, Header, Form, Button, Input } from 'semantic-ui-react';
import { base64Encode } from '@polkadot/util-crypto';

export default function Main ({ accountPair, wasm }) {
  const [formState, setFormState] = useState({ assetId: null });
  const onChange = (_, data) => {
    setFormState(prev => ({ ...prev, [data.state]: data.value }));
  };
  const { assetId } = formState;
  const [address, setAddress] = useState('');

  const showAddress = () => {
    const addressRaw = wasm.generate_shielded_address_for_browser(new Uint8Array(32).fill(0), assetId);
    const addressEncoded = base64Encode(addressRaw);
    setAddress(addressEncoded);
  };

  return (
    <>
      <Grid.Column width={2}/>
      <Grid.Column width={12} textAlign='center'>
      <Header textAlign='center'>Receive</Header>
        <Form>
            <Form.Field style={{ width: '500px', marginLeft: '2em' }}>
              <Input
                fluid
                label='Asset ID'
                type='number'
                state='assetId'
                onChange={onChange}
              />
            </Form.Field>
            <Form.Field style={{ width: '500px', marginLeft: '2em' }}>
              {address}
            </Form.Field>
            <Button onClick={showAddress}>
              Get new address
            </Button>
        </Form>
      </Grid.Column>
      <Grid.Column width={2}/>
    </>
  );
}
