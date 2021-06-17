const FINALIZED = 'Transaction finalized 😊 \n';
const FAILED = 'Transaction failed ❌';
const PROCESSING = 'Transaction processing';

export default class TxStatus {
  constructor (status, block = null, message = null) {
    this.status = status;
    this.block = block;
    this.message = message;
  }

  static processing (block = null, message = null) {
    return new TxStatus(PROCESSING, block, message);
  }

  static finalized (block = null, message = null) {
    return new TxStatus(FINALIZED, block, message);
  }

  static failed (block = null, message = null) {
    return new TxStatus(FAILED, block, message);
  }

  isProcessing () {
    return this.status === PROCESSING;
  }

  isFinalized () {
    return this.status === FINALIZED;
  }

  isFailed () {
    return this.status === FAILED;
  }

  toString () {
    let message = this.status;
    if (this.block) {
      message += `; block hash: ${this.block}`;
    }
    if (this.message) {
      message += `; ${this.message}`;
    }
    return message;
  }
}
