import React, { useState, useRef } from 'react';
import { Form, Grid, Header, Message, Label, Icon } from 'semantic-ui-react';
import { TxButton } from './substrate-lib/components';
import { base64Decode, base64Validate, base64Encode } from '@polkadot/util-crypto';

export default function Main ({ accountPair }) {
  const EXPECTED_PAYLOAD_SIZE_IN_BYTES = 512;

  const [reclaimInfo, setReclaimInfo] = useState(null);
  const [status, setStatus] = useState(null);


  const fileUploadRef = useRef();
  const [uploadErrorText, setUploadErrorText] = useState('');

  const formatBase64StringForDisplay = base64String => {
    if (!base64String) {
      return '';
    }
    const LINE_LENGTH = 75;
    let formattedString = '';
    for (let i = 0; i < base64String.length; i++) {
      formattedString += base64String.slice(i, i + LINE_LENGTH);
      formattedString += '\n';
      i += LINE_LENGTH;
    }
    return formattedString;
  };

  const displayReclaimInfo = transferInfoBytes => {
    setReclaimInfo(transferInfoBytes)
  };

  const validateFileUpload = fileText => {
    try {
      base64Validate(fileText);
    } catch (error) {
      fileUploadRef.current.value = null;
      setUploadErrorText('File is not valid base64');
      return false;
    }
    const bytes = base64Decode(fileText);
    if (bytes.length !== EXPECTED_PAYLOAD_SIZE_IN_BYTES) {
      fileUploadRef.current.value = null;
      setUploadErrorText(`File is ${bytes.length} bytes, expected ${EXPECTED_PAYLOAD_SIZE_IN_BYTES}`);
      return false;
    }
    return true;
  };

  const handleFileUpload = () => {
    setUploadErrorText('');
    displayReclaimInfo([]);
    const file = fileUploadRef.current.files[0];
    if (!file) {
      return;
    }
    const reader = new FileReader();
    reader.readAsText(file);
    reader.onload = async (readerEvent) => {
      const text = (readerEvent.target.result.trim());
      if (validateFileUpload(text)) {
        displayReclaimInfo(base64Decode(text));
      }
    };
  };

  return (
    <Grid.Column width={10}>
      <Header textAlign='center'>Reclaim Private Asset</Header>
      <Form>
        <Form.Field inline='true' style={{ textAlign: 'center' }}>
          <Label basic color='teal'>
              Upload a reclaim file (512 bytes)
            </Label>
          <input
            accept='.txt'
            id='file'
            type='file'
            onChange={handleFileUpload}
            ref={fileUploadRef}
            style={{ marginLeft: 0, marginTop: '.5em', border: '0px'}}
          />
          <Message
            error
            onDismiss={() => setUploadErrorText('')}
            header='Upload failed'
            content={uploadErrorText}
            visible={uploadErrorText.length}
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
              callable: 'reclaim',
              inputParams: [reclaimInfo],
              paramFields: [true]
            }}
          />
        </Form.Field>
        <div style={{ overflowWrap: 'break-word' }}>{status}</div>
      </Form>
    </Grid.Column>
  );
}