export interface ImageDirectoryDiffEvent {
  directoryPaths: Array<string>
}

export interface ImageDirectoryDiffResult {
  directoryPathOne: string,
  directoryPathTwo: string,
  filesInDirectoryOneExceptDirectoryTwo?: Array<string>,
  filesInDirectoryTwoExceptDirectoryOne?: Array<string>,
}
export interface ImageDirectoryDiffResults {

}
export class ImageDirectoryDiff {
  public determine(event: ImageDirectoryDiffEvent) {
    const diffResults: Array<ImageDirectoryDiffResult> = event.directoryPaths.flatMap(
      (one: string, arrayIdx: number) => event.directoryPaths.slice(arrayIdx + 1).map(
        (two: string) => {
          const diffResult: ImageDirectoryDiffResult = { directoryPathOne: one, directoryPathTwo: two }
          return diffResult
        })
    );
    

    // const returnList = this.walkFiles('c:/android-sdcard-11-17-19/Camera/', fileList)
    // const returnList = this.walkFiles('C:/Users/Garrett/Documents/AsusPictures/', fileList)
    // console.log(JSON.stringify(returnList.length))
    return diffResults;
  }
}
