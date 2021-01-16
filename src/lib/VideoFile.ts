import { MediaFile } from "./MediaFile";
export class VideoFile extends MediaFile<VideoFile> {
  private _streams: Array<any>
  private _videoDuration: number

  public async equals(otherFile: MediaFile<VideoFile>) {
    if (!(await super.equals(otherFile))) return false
    if (!(await this.sameVideoDurationInSeconds(otherFile))) return false

    return true
  }

  public async sameVideoDurationInSeconds(otherFile: MediaFile<VideoFile>) {
    const myDuration = await this.getVideoDurationInSeconds()
    const yourDuration = await (<VideoFile>otherFile).getVideoDurationInSeconds()

    if (myDuration == yourDuration) {
      return true
    } else {
      return false
    }
  }

  // https://github.com/Brandon9598/nodejs-video-duration/blob/master/index.js
  public async getVideoDurationInSeconds() {
    if (this._streams == null || this._videoDuration == null) {
      const ffprobe = require('ffprobe')
      const ffprobeStatic = require('ffprobe-static');
      this._streams = (await ffprobe(this.filePath, { path: ffprobeStatic.path }) || {}).streams
      
      // codec_type = 'video' gives you the video stream!
      // https://video.stackexchange.com/questions/27546/difference-between-duration-ts-and-duration-in-ffprobe-output
      const videoStreams = this._streams.filter((value: any, index: number, array: any[]) => {
        if (value.codec_type == 'video') {
          return true
        } else {
          return false
        }
      })

      if (videoStreams.length > 1) {
        throw new Error(`Too many video steams exist for file: ${this.filePath}`)
      } else if (videoStreams.length == 0) {
        throw new Error(`No video streas detected for file: ${this.filePath}`)
      }

      this._videoDuration = videoStreams[0].duration
    }

    return this._videoDuration
  }
}

