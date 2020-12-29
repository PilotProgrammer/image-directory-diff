import { ImageFile } from "./ImageFile";
import { MediaFile } from "./MediaFile";
const exec = require('child_process').exec;

export class VideoFile extends MediaFile<VideoFile> {
  private _stats: any

  // private getGenericMediaType(): <T extends MediaFile> {
  //   return VideoFile
  // }

  public async equals(otherFile: MediaFile<VideoFile>) {
    if (!(await this.sameVideoDurationInSeconds(otherFile))) return false
    if (!super.equals(otherFile)) return false
    
    return true
  }

  public async sameVideoDurationInSeconds(otherFile: MediaFile<VideoFile>) {
    const myDuration = await this.getVideoDurationInSeconds()
    const yourDuration = await (<VideoFile>otherFile).getVideoDurationInSeconds()

    if (myDuration.fileName == yourDuration.fileName) {
      return true
    } else {
      return false
    }
  }

  // https://github.com/Brandon9598/nodejs-video-duration/blob/master/index.js
  public async getVideoDurationInSeconds() {
    if (this._stats == null) {
      const ffprobe = require('ffprobe')
      const ffprobeStatic = require('ffprobe-static');
      this._stats = ffprobe(this.filePath, { path: ffprobeStatic.path })
    }

    // https://video.stackexchange.com/questions/27546/difference-between-duration-ts-and-duration-in-ffprobe-output
    return this._stats.duration
  }
}

