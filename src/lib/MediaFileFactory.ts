import { ImageFileTypes, VideoFileTypes } from "./Constants";
import { ImageFile } from "./ImageFile";
import { MediaFile } from "./MediaFile";
import { VideoFile } from "./VideoFile";

const FileType = require('file-type');

export class MediaFileFactory<T extends MediaFile<any>> {
  private _mediaFileCache = new Map<string, MediaFile<T>>()
  private _useCache = true

  // TODO: unsupported mime types (like txt, cause they aren't media files), and unrecognized mime types (where the fileMimeType variable below would probably be null, causing "Type error mime not available on null object" error), should be treated the same. instead of "throw new exception", paradigm would actually be "return new TypeError" (or whatever error type we choose), using generics, but then have to update callers logic to handle this error.
  public async createMediaFile(filePath: string) {
    const fileType = await FileType.fromFile(filePath)

    if (fileType == null) {
      throw new TypeError(`Could not find File MIME Type for ${filePath}`)
    }

    const fileMimeType: string = fileType.mime

    const fileIsVideoType = (<string[]>Object.values(VideoFileTypes)).includes(fileMimeType)
    const fileIsImageType = (<string[]>Object.values(ImageFileTypes)).includes(fileMimeType)

    let file = null

    if (fileIsVideoType) {
      file = new VideoFile(filePath)
    } else if (fileIsImageType) {
      file = new ImageFile(filePath)
    }

    if (this._useCache) {
      if (this._mediaFileCache.get(filePath) == null) {
        console.log(`cache miss ${filePath}`)
        this._mediaFileCache.set(filePath, file)
      } else {
        console.log(`cache HIT ${filePath}`)
      }

      return this._mediaFileCache.get(filePath)
    } else {
      return file
    }
  }
}