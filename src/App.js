import React, { useState } from 'react';
import { receiver1, receiver2 } from './wasm_constants';

const zkp = async wasm => {
  const request = new XMLHttpRequest();
  request.open('GET', 'transfer_pk.bin', true);
  request.responseType = 'blob';
  request.onreadystatechange = async () => {
    if (request.readyState === 4) {
      const fileContent = request.response;
      const fileContentBuffer = await fileContent.arrayBuffer();
      const provingKey = new Uint8Array(fileContentBuffer);
      wasm.init_panic_hook();
      const start = performance.now();
      console.log(wasm.js_zkp(provingKey, receiver1, receiver2));
      const end = performance.now();
      console.log(`Call to js_zkp took ${start - end} milliseconds.`);
      console.log('js zkp finished');
    }
  };
  request.send(null);
};

const Loaded = ({ wasm }) => {
  const fn = () => {
    zkp(wasm);
  };
  return (
    <button onClick={fn}>Click me</button>
  );
};

const Unloaded = ({ loading, loadWasm }) => {
  return loading ? (
    <div>Loading...</div>
  ) : (
    <button onClick={loadWasm}>Load library</button>
  );
};

const App = () => {
  const [loading, setLoading] = useState(false);
  const [wasm, setWasm] = useState(null);

  const loadWasm = async () => {
    try {
      setLoading(true);
      const wasm = await import('pallet-manta-pay');
      setWasm(wasm);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className='App'>
      <header className='App-header'>
        {wasm ? (
          <Loaded wasm={wasm} />
        ) : (
          <Unloaded loading={loading} loadWasm={loadWasm} />
        )}
      </header>
    </div>
  );
};

export default App;
