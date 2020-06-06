const fs = require('fs');
export class Directory {
  public constructor(private directoryName: string) {
    this._allFiles = this.walkFiles(this.directoryName, []);
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
  ;
}
