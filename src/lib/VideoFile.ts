import { MediaFile } from "./MediaFile";
const exec = require('child_process').exec;

export class VideoFile extends MediaFile {

  private _stats: any
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

