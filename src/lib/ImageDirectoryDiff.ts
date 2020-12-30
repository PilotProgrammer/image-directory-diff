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
      returnDiffResults.diffResults.push({
        filesInDirectoryOneExceptDirectoryTwo: null,
        filesInDirectoryTwoExceptDirectoryOne: null,
        ... element
      })
    })
    
    // const returnList = this.walkFiles('c:/android-sdcard-11-17-19/Camera/', fileList)
    // const returnList = this.walkFiles('C:/Users/Garrett/Documents/AsusPictures/', fileList)
    // console.log(JSON.stringify(returnList.length))
    return returnDiffResults
  }

  private createDirectoryTuples(event: ImageDirectoryDiffEvent): ImageDirectoryDiffPreProcess[] {
    return event.directoryPaths.flatMap(
      (one: string, arrayIdx: number) => event.directoryPaths.slice(arrayIdx + 1).map(
        (two: string) => {
          const diffPreprocessResult: ImageDirectoryDiffPreProcess = { directoryPathOne: one, directoryPathTwo: two };
          return diffPreprocessResult;
        })
    );
  }
}
