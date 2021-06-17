import BN from 'bn.js';

export default class MintData {
  constructor (bytes) {
    this.assetId = new BN(bytes.slice(0, 8), 10, 'le');
    this.mintAmount = new BN(bytes.slice(8, 16), 10, 'le');
    this.cm = bytes.slice(16, 48);
    this.k = bytes.slice(48, 80);
    this.s = bytes.slice(80, 112);
  }
}
