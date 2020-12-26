export class FileComparater {

  public constructor(private directoryName: string) {
    this._allFiles = this.walkFiles(this.directoryName, []);

    // TODO
    // check file name
    // file hash
    // file size
    // file type
    // if movie, duration, other movie or picture specs that can be verified?
  }

  private _allFiles: string;

  get allFiles() {
    return this._allFiles;
  }

  private walkFiles(dir: any, filelist: any): any {
  }
}
