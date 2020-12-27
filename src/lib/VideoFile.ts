import { MediaFile } from "./MediaFile";
const exec = require('child_process').exec;

export class VideoFile extends MediaFile {
  // https://github.com/Brandon9598/nodejs-video-duration/blob/master/index.js
  public async getVideoDurationInSeconds() {
    const ffprobe = require('ffprobe')
    const ffprobeStatic = require('ffprobe-static');

    return ffprobe(this.filePath, { path: ffprobeStatic.path })
    
    // , function (err: any, info: any) {
    //   console.log(info);
    // }).catch(function (err: any) {
    //   console.error(err);
    // })

    // const params = ['-v', 'error', '-show_format', '-show_streams']
    // exec(`ffprobe ${params.join(' ')} ${this.filePath}`, (err: any, stdout: any, stderr: any) => {
    //   if (err instanceof Error) {
    //     throw err;
    //   }
    //   const matched = stdout.match(/duration="?(\d*\.\d*)"?/)
    //   if (matched && matched[1]) return parseFloat(matched[1])
    //   throw new Error('No duration found!')
    // });
  }
}

