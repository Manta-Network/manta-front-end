export default class MantaAssetPubInfo {
  constructor (bytes) {
    this.pk = bytes.slice(0, 32);
    this.rho = bytes.slice(32, 64);
    this.s = bytes.slice(64, 96);
    this.r = bytes.slice(96, 128);
    this.k = bytes.slice(128, 160);
  }
}
