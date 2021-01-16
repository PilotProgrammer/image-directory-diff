import { ImageFileTypes, VideoFileTypes } from "./Constants";
import { ImageFile } from "./ImageFile";
import { MediaFile } from "./MediaFile";
import { VideoFile } from "./VideoFile";
import { ok, err, Result } from "./ResponseUtility";

const FileType = require('file-type');

export class MediaFileCreationError extends Error { }
export class MediaFileFactory<T extends MediaFile<any>> {
  private static _mediaFileCache = new Map<string, MediaFile<any>>()
  private _useCache = true

  public async createMediaFile(filePath: string): Promise<Result<MediaFile<T>, MediaFileCreationError>> {
    const fileType = await FileType.fromFile(filePath)

    if (fileType == null) {
      const errMsg = `Could not find File MIME Type for ${filePath}`
      console.warn(errMsg)
      return err(new MediaFileCreationError(errMsg)) // TODO return error result instead of throw erro!!
    }

    if (this._useCache) {
      if (MediaFileFactory._mediaFileCache.get(filePath) == null) {
        console.log(`cache miss ${filePath}`)

        const fileMimeType: string = fileType.mime

        if ((<string[]>Object.values(VideoFileTypes)).includes(fileMimeType)) {
          MediaFileFactory._mediaFileCache.set(filePath, new VideoFile(filePath))
        } else if ((<string[]>Object.values(ImageFileTypes)).includes(fileMimeType)) {
          MediaFileFactory._mediaFileCache.set(filePath, new ImageFile(filePath))
        }
      } else {
        console.log(`cache HIT ${filePath}`)
      }

      return ok(MediaFileFactory._mediaFileCache.get(filePath))
    } else {
      const fileMimeType: string = fileType.mime

      if ((<string[]>Object.values(VideoFileTypes)).includes(fileMimeType)) {
        return ok(new VideoFile(filePath))
      } else if ((<string[]>Object.values(ImageFileTypes)).includes(fileMimeType)) {
        return ok(new ImageFile(filePath))
      }
      return null
    }
  }
}