import { Directory } from "./Directory";
import { ImageDirectoryDiffResult } from "./ImageDirectoryDiff";

export class DirectoryComparater {

  public constructor(private leftDirectoryPath: string, private rightDirectoryPath: string) {
    this._leftDirectory = new Directory(leftDirectoryPath)
    this._rightDirectory = new Directory(rightDirectoryPath)
  }

  private _leftDirectory: Directory;
  private _rightDirectory: Directory;

  public diffDirectories() {
    const allFilePairs = this._leftDirectory.allFiles.flatMap((d: any) => this._rightDirectory.allFiles.map((v: any) => d + v))

    let returnDiff: ImageDirectoryDiffResult = {
      directoryPathOne: this.leftDirectoryPath,
      directoryPathTwo: this.rightDirectoryPath,
      filesInDirectoryOneExceptDirectoryTwo: null, // TODO
      filesInDirectoryTwoExceptDirectoryOne: null, // TODO
    }

    return returnDiff
  }
}
