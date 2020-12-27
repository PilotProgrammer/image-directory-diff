import { Hash } from 'crypto'

const fs = require('fs');
const crypto = require('crypto')
export class HashCreater {

  public constructor(private algorithm: any, private path: any) { }

  private _checkSum: string

  // https://stackoverflow.com/questions/18658612/obtaining-the-hash-of-a-file-using-the-stream-capabilities-of-crypto-module-ie "Further polish, ECMAScript 2015"
  public async getChecksum() {
    if (this._checkSum == null) {
      this._checkSum = await new Promise((resolve, reject) =>
        fs.createReadStream(this.path)
          .on('error', reject)
          .pipe(crypto.createHash(this.algorithm)
            .setEncoding('hex'))
          .once('finish', function (this: Hash) {
            resolve(this.read())
          }))
    }

    return this._checkSum
  }
}
