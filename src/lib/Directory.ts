import { MediaFileFactory } from "./MediaFileFactory";

const fs = require('fs');
const path = require('path')

export class Directory {

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
    const factory = new MediaFileFactory()
    const compareFile = await factory.createMediaFile(compareFilePath)
    
    let found = false
    
    for (const myFilePath in this._allFilePaths) {
      const myFile = await factory.createMediaFile(myFilePath)

      if (compareFile.equals(myFile)) {
        found = true
        break
      }
    }

    return found
  }
}
