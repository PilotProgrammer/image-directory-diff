import { ImageFileTypes, VideoFileTypes } from "./Constants";
import { ImageFile } from "./ImageFile";
import { MediaFile } from "./MediaFile";
import { VideoFile } from "./VideoFile";

const FileType = require('file-type');

export class MediaFileFactory<T extends MediaFile<any>> {
  private _mediaFileCache = new Map<string, MediaFile<T>>()
  private _useCache = true

  public async createMediaFile(filePath: string) {
    if (this._useCache) {
      if (this._mediaFileCache.get(filePath) == null) {
        console.log(`cache miss ${filePath}`)

        const fileMimeType: string = (await FileType.fromFile(filePath)).mime

        if ((<string[]>Object.values(VideoFileTypes)).includes(fileMimeType)) {
          this._mediaFileCache.set(filePath, new VideoFile(filePath))
        } else if ((<string[]>Object.values(ImageFileTypes)).includes(fileMimeType)) {
          this._mediaFileCache.set(filePath, new ImageFile(filePath))
        }
      } else {
        console.log(`cache HIT ${filePath}`)
      }

      return this._mediaFileCache.get(filePath)
    } else {
      const fileMimeType: string = (await FileType.fromFile(filePath)).mime

      if ((<string[]>Object.values(VideoFileTypes)).includes(fileMimeType)) {
        return new VideoFile(filePath)
      } else if ((<string[]>Object.values(ImageFileTypes)).includes(fileMimeType)) {
        return new ImageFile(filePath)
      }
      return null
    }
  }
}