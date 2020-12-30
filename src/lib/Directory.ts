const fs = require('fs');

export class Directory {

  public constructor(private directoryPath: string) {
    this._allFiles = this.walkFiles(this.directoryPath, []);
  }

  private _allFiles: string;

  get allFiles() {
    return this._allFiles;
  }

  private walkFiles(dir: any, filelist: any): any {
    let files = fs.readdirSync(dir);
    filelist = filelist || [];
    for (let file of files) {
      if (fs.statSync(dir + file).isDirectory()) {
        filelist = this.walkFiles(dir + file + '/', filelist);
      }
      else {
        filelist.push(file);
      }
    }
    return filelist;
  }
}
