import { MediaFileFactory } from "./MediaFileFactory";
import { factory } from "../Program";

const fs = require('fs');
const path = require('path')

export class Directory {
  private logger = factory.getLogger((<any>this).constructor.name)
  private readonly factory = new MediaFileFactory()

  public constructor(private directoryPath: string) {
    this._allFilePaths = this.walkFiles(this.directoryPath, []);
  }

  private _allFilePaths: string[];

  get allFiles() {
    return this._allFilePaths;
  }

  private walkFiles(dir: string, filelist: Array<string>) {
    let files = fs.readdirSync(dir);
    filelist = filelist || [];
    for (let file of files) {
      const filePath = path.join(dir, file)
      if (fs.statSync(filePath).isDirectory()) {
        filelist = this.walkFiles(filePath + '/', filelist);
      }
      else {
        filelist.push(filePath);
      }
    }
    return filelist
  }

  public async containsFile(compareFilePath: string) {
    const compareFile = await this.factory.createMediaFile(compareFilePath)
    
    let found = false
    
    for (const myFilePath of this._allFilePaths) {
      const myFile = await this.factory.createMediaFile(myFilePath)

      if (await compareFile.equals(myFile)) {
        
        found = true
        break
      }
    }

    this.logger.info(`Directory ${this.directoryPath} contains file ${compareFile}? ${found}`)

    return found
  }
}
