import { factory } from "../Program";
import { HashCreater } from "./HashCreater";

const FileType = require('file-type');

// https://stackoverflow.com/questions/42705406/typescript-how-to-set-method-return-value-subclass
export abstract class MediaFile<T extends MediaFile<any>> {
  private logger = factory.getLogger((<any>this).constructor.name)

  public constructor(protected filePath: string) { }

  private _hashCreater: HashCreater
  private _fileMimeType: string
  private _fileSize: number
  
  public async equals(otherFile: MediaFile<T>) {
    this.logger.info(`Checking this file ${this.filePath} equal otherFile ${otherFile.filePath}`)
    if (otherFile == null) return false
    if (!(await this.sameFileName(otherFile))) return false
    if (!(await this.sameHash(otherFile))) return false
    if (!(await this.sameTotalFileBytes(otherFile))) return false
    if (!(await this.sameFileMimeType(otherFile))) return false
    return true
  }

  public async sameFileMimeType(otherFile: MediaFile<T>) {
    // console.log(`this.getFileMimeType() != otherFile.getFileMimeType()? ${await this.getFileMimeType() != await otherFile.getFileMimeType()}`)
    let sameFileMimeType = false

    try {
      sameFileMimeType = await this.getFileMimeType() == await otherFile.getFileMimeType()
    } catch (error) {
      this.logger.error(`Error generating file mime types for comparison of ${this.filePath} and ${otherFile.filePath} error: ${JSON.stringify(error)}`)
    }
    
    if (sameFileMimeType) {
      return true
    } else {
      return false
    }
  }

  public async sameTotalFileBytes(otherFile: MediaFile<T>) {
    // console.log(`this.getTotalFileBytes() != otherFile.getTotalFileBytes()? ${this.getTotalFileBytes() != otherFile.getTotalFileBytes()}`)
    if (this.getTotalFileBytes() == otherFile.getTotalFileBytes()) {
      return true
    } else {
      return false
    }
  }

  public async sameFileName(otherFile: MediaFile<T>) {
    // console.log(`this.fileName != otherFile.fileName? ${this.fileName != otherFile.fileName}`)
    if (this.fileName == otherFile.fileName) {
      return true
    } else {
      return false
    }
  }

  public async sameHash(otherFile: MediaFile<T>) {
    // console.log(`this.checksum != otherFile.checksum? ${await this.getChecksum() != await otherFile.getChecksum()}`)
    if (await this.getChecksum() == await otherFile.getChecksum()) {
      return true
    } else {
      return false
    }
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
    if (this._fileMimeType == null) this._fileMimeType = (await FileType.fromFile(this.filePath)).mime
    return this._fileMimeType
  }
}