import { Directory } from "./Directory";

export class DirectoryComparater {

  public constructor(private directorySourceName: string, private directoryTargetName: string) {
    this._directorySource = new Directory(directorySourceName)
    this._directoryTarget = new Directory(directoryTargetName)
  }

  private _directorySource: Directory;
  private _directoryTarget: Directory;

  // get allFiles() {
  //   return this._allFiles;
  // }

  private walkFiles(dir: any, filelist: any): any {
  } 
}
