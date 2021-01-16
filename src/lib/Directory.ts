import { factory } from "../Program";
import { MediaFile } from "./MediaFile";
import { MediaFileFactory } from "./MediaFileFactory";

const fs = require('fs');
const path = require('path')

export class Directory {
  private logger = factory.getLogger((<any>this).constructor.name)
  private readonly factory = new MediaFileFactory()

  public constructor(private directoryPath: string) {
  }

  private _allFilePaths: string[];

  public async getAllFilePaths() {
    this._allFilePaths = await this.walkFiles(this.directoryPath, []);
    return this._allFilePaths;
  }

  private async walkFiles(dir: string, filelist: Array<string>) {
    let files = fs.readdirSync(dir);
    filelist = filelist || [];
    for (let file of files) {
      const filePath = path.join(dir, file)
      if (fs.statSync(filePath).isDirectory()) {
        filelist = await this.walkFiles(filePath + '/', filelist);
      }
      else {
        const fileResult = await this.factory.createMediaFile(filePath)

        if (fileResult.isOk() && fileResult.contents()) {
          filelist.push(filePath)
        }
      }
    }
    return filelist
  }

  public async containsFile(compareFilePath: string) {
    let found = false
    const compareFileResult = await this.factory.createMediaFile(compareFilePath)

    if (compareFileResult.isOk()) {
      const compareFile = <MediaFile<any>>(compareFileResult.contents())

      for (const myFilePath of await this.getAllFilePaths()) {
        const myFileResult = await this.factory.createMediaFile(myFilePath)
        const myFile = <MediaFile<any>>myFileResult.contents()

        await compareFile.equals(myFile)

        if (await compareFile.equals(myFile)) {
          found = true
          break
        }
      }

      this.logger.info(`Directory ${this.directoryPath} contains file ${compareFile}? ${found}`)
    }

    return found
  }
}
