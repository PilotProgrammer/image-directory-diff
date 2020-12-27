import { ImageFileTypes, VideoFileTypes } from "./Constants";

const FileType = require('file-type');

export class MediaFileFactory {
  public async createMediaFile(filePath: string) {
    const fileMimeType: string = (await FileType.fromFile(filePath)).mime

    console.log(`fileMimeType ${fileMimeType} Object.values(VideoFileTypes) ${Object.values(VideoFileTypes)} Object.values(ImageFileTypes) ${Object.values(ImageFileTypes)}`)

    // if (Object.values(VideoFileTypes).includes('video/MP4')) {
    // }
  }
}