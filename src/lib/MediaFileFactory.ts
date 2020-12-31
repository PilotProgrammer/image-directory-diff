import { ImageFileTypes, VideoFileTypes } from "./Constants";
import { ImageFile } from "./ImageFile";
import { MediaFile } from "./MediaFile";
import { VideoFile } from "./VideoFile";

const FileType = require('file-type');

export class MediaFileFactory<T extends MediaFile<any>> {
  private _mediaFileCache = new Map<string, MediaFile<T>>()

  public async createMediaFile(filePath: string) {
    if (this._mediaFileCache.get(filePath) == null) {
      const fileMimeType: string = (await FileType.fromFile(filePath)).mime

      if ((<string[]>Object.values(VideoFileTypes)).includes(fileMimeType)) {
        this._mediaFileCache.set(filePath, new VideoFile(filePath))
      } else if ((<string[]>Object.values(ImageFileTypes)).includes(fileMimeType)) {
        this._mediaFileCache.set(filePath, new ImageFile(filePath))
      }  
    }

    return this._mediaFileCache.get(filePath)
  }
}