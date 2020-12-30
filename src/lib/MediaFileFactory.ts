import { ImageFileTypes, VideoFileTypes } from "./Constants";
import { ImageFile } from "./ImageFile";
import { MediaFile } from "./MediaFile";
import { VideoFile } from "./VideoFile";

const FileType = require('file-type');

export class MediaFileFactory {
  public async createMediaFile(filePath: string) {
    const fileMimeType: string = (await FileType.fromFile(filePath)).mime

    if ((<string[]>Object.values(VideoFileTypes)).includes(fileMimeType)) {
      return new VideoFile(filePath)
    } else if ((<string[]>Object.values(ImageFileTypes)).includes(fileMimeType)) {
      return new ImageFile(filePath)
    }

    return null
  }
}