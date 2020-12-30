import { DirectoryComparater } from "./DirectoryComparater";
const path = require('path')

export interface ImageDirectoryDiffEvent {
  directoryPaths: Array<string>
}

interface ImageDirectoryDiffPreProcess {
  directoryPathOne: string,
  directoryPathTwo: string,
}

export interface ImageDirectoryDiffResult extends ImageDirectoryDiffPreProcess {
  filesInDirectoryOneExceptDirectoryTwo: Array<string>,
  filesInDirectoryTwoExceptDirectoryOne: Array<string>,
}

export interface ImageDirectoryDiffResults {
  diffResults: Array<ImageDirectoryDiffResult>
}

export class ImageDirectoryDiff {
  public determine(event: ImageDirectoryDiffEvent) {
    // return this
    const returnDiffResults: ImageDirectoryDiffResults = {
      diffResults: new Array()
    }

    // create tuples of each pair that was passed in list of directories
    const directoryTuples: Array<ImageDirectoryDiffPreProcess> = this.createDirectoryTuples(event);
    
    directoryTuples.forEach(element => {
      const pathOne = path.normalize(element.directoryPathOne)
      const pathTwo = path.normalize(element.directoryPathOne)
      const directoryComparater = new DirectoryComparater(pathOne, pathTwo)
      const directoryDiff = directoryComparater.diffDirectories()
      returnDiffResults.diffResults.push(directoryDiff)
    })
    
    return returnDiffResults
  }

  private createDirectoryTuples(event: ImageDirectoryDiffEvent): ImageDirectoryDiffPreProcess[] {
    return event.directoryPaths.flatMap(
      (one: string, arrayIdx: number) => event.directoryPaths.slice(arrayIdx + 1).map(
        (two: string) => {
          const diffPreprocessResult: ImageDirectoryDiffPreProcess = { directoryPathOne: one, directoryPathTwo: two };
          return diffPreprocessResult;
        })
    )
  }
}
