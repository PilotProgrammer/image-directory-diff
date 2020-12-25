export class File {

  public constructor(private directoryName: string) {
    this._allFiles = this.walkFiles(this.directoryName, []);
  }

  private _allFiles: string;

  get allFiles() {
    return this._allFiles;
  }

  private walkFiles(dir: any, filelist: any): any {
  }
}
