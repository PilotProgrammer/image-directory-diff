import { Directory } from "./Directory";

export class DirectoryComparater {

  public constructor(private leftDirectory: string, private rightDirectory: string) {
    this._leftDirectory = new Directory(leftDirectory)
    this._rightDirectory = new Directory(rightDirectory)
  }

  private _leftDirectory: Directory;
  private _rightDirectory: Directory;

  // get allFiles() {
  //   return this._allFiles;
  // }

  private walkFiles(dir: any, filelist: any): any {
  } 
}
