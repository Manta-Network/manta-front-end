import React, { useState } from 'react';
import { Dropdown } from 'semantic-ui-react';
import PrivateTransfer from './PrivateTransfer';
import Mint from './Mint';
import Reclaim from './Reclaim';

export default function Main ({ accountPair }) {
  const dropdownItems = [
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
    }
  ];
  const [dropdownState, changeDropdownState] = useState(dropdownItems[0].value);

  console.log(dropdownState);
  let page = <div/>;
  if (dropdownState === 'Mint') {
    page = <Mint accountPair={accountPair} />;
  } else if (dropdownState === 'Private transfer') {
    page = <PrivateTransfer accountPair={accountPair} />;
  } else if (dropdownState === 'Reclaim') {
    page = <Reclaim accountPair={accountPair} />;
  }

  return (
    <div textAlign='left'>
      <Dropdown
        onChange={(e, { value }) => {
          changeDropdownState(value);
          console.log('value', value);
        }}
        defaultValue={'Mint'}
        selection
        options={dropdownItems}
        style={{ marginBottom: '4em' }}
      />
      {page}
    </div>
  );
}
