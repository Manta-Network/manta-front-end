import React from 'react';
import { Grid, Header } from 'semantic-ui-react';
import MantaAsset from './dtos/MantaAsset';
import BN from 'bn.js';
import { loadSpendableAssets } from './utils/Persistence';

export default function Main () {
  const balanceByAssetId = {};
  loadSpendableAssets()
    .map(asset => new MantaAsset(new Uint8Array(Object.values(asset))))
    .forEach(asset => {
      const currentValue = balanceByAssetId[asset.assetId]
        ? balanceByAssetId[asset.assetId]
        : new BN(0);
      balanceByAssetId[asset.assetId] = currentValue.add(asset.privInfo.value);
    });

  return (
    <>
      <Grid.Column width={2}/>
      <Grid.Column width={12} textAlign='center'>
        <Header textAlign='center'>Private Balances</Header>
        {
          Object.entries(balanceByAssetId).map(([assetId, amount]) => {
            return <div key={assetId}>Asset{assetId}: {amount.toString(10)}</div>;
          })
        }
      </Grid.Column>
      <Grid.Column width={2}/>
    </>
  );
}
