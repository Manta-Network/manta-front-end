import BN from 'bn.js';

export default class MantaAssetPrivInfo {
  constructor (bytes) {
    this.value = new BN(bytes.slice(0, 8), 10, 'le');
  }
}
