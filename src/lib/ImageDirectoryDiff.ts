export class ImageDirectoryDiff {
  public determine(event: any) {
    console.log(process.argv);
    const response = 'Hello World!' + JSON.stringify(event, null, 2);
    let fileList: [] = [];
    // const returnList = this.walkFiles('c:/android-sdcard-11-17-19/Camera/', fileList)
    // const returnList = this.walkFiles('C:/Users/Garrett/Documents/AsusPictures/', fileList)
    // console.log(JSON.stringify(returnList.length))
    return response;
  }
}
