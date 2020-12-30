const fs = require('fs');
const path = require('path')

export class Directory {

  public constructor(private directoryPath: string) {
    this._allFiles = this.walkFiles(this.directoryPath, []);
  }

  private _allFiles: string[];

  get allFiles() {
    return this._allFiles;
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
}
