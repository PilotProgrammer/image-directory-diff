import { Hash } from "crypto";
import { HashCreater } from "./HashCreater";

const FileType = require('file-type');

export class File {

  public constructor(private filePath: string) {
    // this._allFiles = this.walkFiles(this.directoryName, []);
  }

  private _hashCreater: HashCreater;
  private _fileMimeType: string;

  get checksum() {
    if (this._hashCreater == null) {
      // TODO settings file for algorithm to use
      this._hashCreater = new HashCreater('sha256', this.filePath)
    }

    return this._hashCreater.getChecksum();
  }

  public async getFileMimeType() {
    if (this._fileMimeType == null)
      this._fileMimeType = (await FileType.fromFile(this.filePath)).mime

      // console.log('hello3: ' + JSON.stringify(await FileType.fromFile(this.filePath)));

    return this._fileMimeType
  }
}


    // public static async CreateAsync(filePath: string) {
  //   const file = new File(filePath) 
  // }