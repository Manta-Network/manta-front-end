import React from 'react';
import { Route, Switch, Redirect } from 'react-router-dom';
import Transfer from './Transfer';
import Labs from './Labs';

import Governance from './Governance';

export default function Main ({ accountPair, wasm }) {
  return (
      <Switch>
          <Redirect exact from="/" to="/ma_token" />
          <Redirect exact from="/substrate-front-end-template" to="/ma_token" />
          <Route path="/ma_token" component={() => <Transfer accountPair={accountPair} />} />
          <Route path="/labs" component={() => <Labs accountPair={accountPair} wasm={wasm}/>} />
          <Route path="/governance" component={Governance} />
      </Switch>
  );
}
