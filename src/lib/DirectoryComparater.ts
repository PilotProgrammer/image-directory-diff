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

  public diffDirectories() {
    const allFilePairs = this._leftDirectory.allFiles.flatMap((leftFile: string) => {
      return this._rightDirectory.allFiles.map((rightFile: string) => {
        const tuple = [leftFile, rightFile]
        return tuple
      })
    })

    const filesInDirectoryOneExceptDirectoryTwo = new Array<string>()
    const filesInDirectoryTwoExceptDirectoryOne = new Array<string>()

    allFilePairs.forEach( (element: string[]) => {
      const left = element[0]
      const right = element[1]

      const factory = new MediaFileFactory()
      // const image1 = <ImageFile> await factory.createMediaFile(imageFileName1)
  
    })
    let returnDiff: ImageDirectoryDiffResult = {
      directoryPathOne: this.leftDirectoryPath,
      directoryPathTwo: this.rightDirectoryPath,
      filesInDirectoryOneExceptDirectoryTwo: null, // TODO
      filesInDirectoryTwoExceptDirectoryOne: null, // TODO
    }

    return returnDiff
  }
}
