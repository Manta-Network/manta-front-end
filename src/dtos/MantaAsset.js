import BN from 'bn.js';
import MantaAssetPubInfo from './MantaAssetPubInfo';
import MantaAssetPrivInfo from './MantaAssetPrivInfo';

export default class MantaAsset {
  constructor (bytes) {
    this.assetId = new BN(bytes.slice(0, 8), 10, 'le');
    this.utxo = bytes.slice(8, 40);
    this.voidNumber = bytes.slice(40, 72);
    this.pubInfo = new MantaAssetPubInfo(bytes.slice(72, 232));
    this.privInfo = new MantaAssetPrivInfo(bytes.slice(232, 272));
  }

  static fromStorage (storageObj) {
    const bytes = new Uint8Array(Object.values(storageObj));
    return new MantaAsset(bytes);
  }

  serialize () {
    return Uint8Array.from([
      ...this.assetId.toArray('le', 8),
      ...this.utxo,
      ...this.voidNumber,
      ...this.pubInfo.serialize(),
      ...this.privInfo.serialize()
    ]);
  }
}
