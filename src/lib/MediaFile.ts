import { Hash } from "crypto";
import { HashCreater } from "./HashCreater";
import { factory } from "../Program";

const FileType = require('file-type');

export abstract class MediaFile {
  private logger = factory.getLogger((<any>this).constructor.name);

  public constructor(protected filePath: string) { }

  private _hashCreater: HashCreater;
  private _fileMimeType: string;
  private _fileSize: number

  public async equals(otherFile: MediaFile | null) {
    if (otherFile == null) {
      return false
    }

    // check file name
    // console.log(`this.fileName != otherFile.fileName? ${this.fileName != otherFile.fileName}`)
    if (this.fileName != otherFile.fileName) {
      return false
    }

    // console.log(`this.checksum != otherFile.checksum? ${await this.getChecksum() != await otherFile.getChecksum()}`)
    // file hash
    if (await this.getChecksum() != await otherFile.getChecksum()) {
      return false
    }

    // file size
    // console.log(`this.getTotalFileBytes() != otherFile.getTotalFileBytes()? ${this.getTotalFileBytes() != otherFile.getTotalFileBytes()}`)
    if (this.getTotalFileBytes() != otherFile.getTotalFileBytes()) {
      return false
    }

    // file type
    // console.log(`this.getFileMimeType() != otherFile.getFileMimeType()? ${await this.getFileMimeType() != await otherFile.getFileMimeType()}`)
    if (await this.getFileMimeType() != await otherFile.getFileMimeType()) {
      return false
    }

    return true
  }

  public async getChecksum() {
    if (this._hashCreater == null) {
      // TODO settings file for algorithm to use
      this._hashCreater = new HashCreater('sha256', this.filePath)
    }

    return await this._hashCreater.getChecksum();
  }

  get fileName() {
    return this.filePath.replace(/^.*[\\\/]/, '')
  }

  public getTotalFileBytes(): number {
    if (this._fileSize == null) {
      const fs = require("fs"); //Load the filesystem module
      const stats = fs.statSync(this.filePath)
      this._fileSize = stats.size
    }

    return this._fileSize
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