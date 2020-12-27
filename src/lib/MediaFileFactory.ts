const FileType = require('file-type');

export class MediaFileFactory { 
  public async createMediaFile(filePath: string) {
    const fileMimeType: string = (await FileType.fromFile(filePath)).mime

    
  }
}