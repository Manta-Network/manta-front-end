import React, { useState } from 'react';
import { Dropdown } from 'semantic-ui-react';
import PrivateTransfer from './PrivateTransfer';
import Mint from './Mint';
import Reclaim from './Reclaim';
import InitAsset from './InitAsset';
import PrivateBalances from './PrivateBalances';
import Receive from './PrivateReceive';

export default function Main ({ fromAccount, wasm, mantaKeyring }) {
  const dropdownItems = [
    {
      key: 'Init Asset',
      text: 'Init Asset',
      value: 'Init Asset'
    },
    {
      key: 'Mint',
      text: 'Mint',
      value: 'Mint'
    },
    {
      key: 'Private transfer',
      text: 'Private transfer',
      value: 'Private transfer'
    },
    {
      key: 'Reclaim',
      text: 'Reclaim',
      value: 'Reclaim'
    },
    {
      key: 'Receive',
      text: 'Receive',
      value: 'Receive'
    },
    {
      key: 'Private Balances',
      text: 'Private Balances',
      value: 'Private Balances'
    }
  ];
  const [dropdownState, changeDropdownState] = useState(dropdownItems[0].value);

  let page = <div/>;
  if (dropdownState === 'Init Asset') {
    page = <InitAsset fromAccount={fromAccount}/>;
  } else if (dropdownState === 'Mint') {
    page = <Mint fromAccount={fromAccount} wasm={wasm} mantaKeyring={mantaKeyring}/>;
  } else if (dropdownState === 'Private transfer') {
    page = <PrivateTransfer fromAccount={fromAccount} wasm={wasm} mantaKeyring={mantaKeyring}/>;
  } else if (dropdownState === 'Reclaim') {
    page = <Reclaim fromAccount={fromAccount} wasm={wasm} mantaKeyring={mantaKeyring}/>;
  } else if (dropdownState === 'Receive') {
    page = <Receive fromAccount={fromAccount} wasm={wasm} mantaKeyring={mantaKeyring}/>;
  } else if (dropdownState === 'Private Balances') {
    page = <PrivateBalances fromAccount={fromAccount} wasm={wasm} mantaKeyring={mantaKeyring}/>;
  }

  return (
    <div textAlign='left'>
      <Dropdown
        onChange={(e, { value }) => {
          changeDropdownState(value);
        }}
        defaultValue={'Init Asset'}
        selection
        options={dropdownItems}
        style={{ marginBottom: '4em' }}
      />
      {page}
    </div>
  );
}
