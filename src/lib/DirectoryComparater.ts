import { Directory } from "./Directory";
import { ImageDirectoryDiffResult } from "./ImageDirectoryDiff";
import { MediaFileFactory } from "./MediaFileFactory";


export class DirectoryComparater {

  public constructor(private leftDirectoryPath: string, private rightDirectoryPath: string) {
    this._leftDirectory = new Directory(leftDirectoryPath)
    this._rightDirectory = new Directory(rightDirectoryPath)
  }

  private _leftDirectory: Directory;
  private _rightDirectory: Directory;

  public async diffDirectories() {
    const filesInDirectoryLeftButNotInDirectoryRight = new Array<string>()
    const filesInDirectoryRightButNotInDirectoryLeft = new Array<string>()

    try {
      // for await (const myFile of this._leftDirectory.allFiles) {
      for (const myFile of this._leftDirectory.allFiles) {
        if ((await this._rightDirectory.containsFile(myFile)) == false) {
          filesInDirectoryLeftButNotInDirectoryRight.push(myFile)
        }
      }

      for (const myFile of this._rightDirectory.allFiles) {
        if ((await this._leftDirectory.containsFile(myFile)) == false) {
          filesInDirectoryRightButNotInDirectoryLeft.push(myFile)
        }
      }
    } catch (error) {
      console.error(`diffDirectories.error.${JSON.stringify(error)}`)
    }

    // await Promise.all(this._leftDirectory.allFiles.map(async (file: string) => {
    //   if ((await this._rightDirectory.containsFile(file)) == false) {
    //     filesInDirectoryLeftButNotInDirectoryRight.push(file)
    //   }
    // }))

    /*
    const filesInDirectoryRightButNotInDirectoryLeft = new Array<string>()
    await Promise.all(this._rightDirectory.allFiles.map(async (file: string) => {
      if ((await this._leftDirectory.containsFile(file)) == false) {
        filesInDirectoryRightButNotInDirectoryLeft.push(file)
      }
    }))
    */

    let returnDiff: ImageDirectoryDiffResult = {
      directoryPathOne: this.leftDirectoryPath,
      directoryPathTwo: this.rightDirectoryPath,
      filesInDirectoryOneExceptDirectoryTwo: filesInDirectoryLeftButNotInDirectoryRight,
      filesInDirectoryTwoExceptDirectoryOne: filesInDirectoryRightButNotInDirectoryLeft,
    }

    return returnDiff
  }
}
