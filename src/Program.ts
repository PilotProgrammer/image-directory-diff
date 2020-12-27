import { LoggerFactory, LoggerFactoryOptions, LFService, LogGroupRule, LogLevel } from "typescript-logging";

import { ArgParser } from "./lib/ArgParser";
import { MediaFile } from "./lib/MediaFile";
import { ImageDirectoryDiff } from "./lib/ImageDirectoryDiff";
import { ImageFile } from "./lib/ImageFile";
import { VideoFile } from "./lib/VideoFile";

const options = new LoggerFactoryOptions()
  // .addLogGroupRule(new LogGroupRule(new RegExp("model.+"), LogLevel.Debug))
  .addLogGroupRule(new LogGroupRule(new RegExp(".+"), LogLevel.Info));

export const factory = LFService.createNamedLoggerFactory("LoggerFactory", options);

exports.handler = async (event: any = {}): Promise<any> => {
  const prog = new ImageDirectoryDiff();
  // prog.main(event);
}

const argParser = new ArgParser();
let { haystackDir, needlesDir } = argParser.parseArgs();
console.log(`haystackDir: ${haystackDir} needlesDir: ${needlesDir}`)

// '/Library/haystack/1.JPG' is 1557620823e163c4c69bf7970df6e007fed8741613ded73009dd93eed04586ce
// const fileName = '/Library/haystack/1.JPG'
const videoFileName1 = '/Library/needles/11.MOV'
const fileName = '/Library/needles/1.JPG'
const fileName2 = '/Library/needles/2.JPG'
const fileName3 = '/Library/haystack/2.JPG'


export class Program {
  public static async main() {
    const videoFile = new VideoFile(fileName)
    const duration = await videoFile.getVideoDurationInSeconds()
    console.log(`duration ${JSON.stringify(duration)}`);

    const file = new ImageFile(fileName)
    const fileType = await file.getFileMimeType()
    const fileHash = await file.getChecksum()
    const fileStats = await file.getTotalFileBytes()
    console.log(`READ ${fileType} ${fileHash} ${fileName} stats ${JSON.stringify(fileStats)}`);

    const file2 = new ImageFile(fileName2)
    const file3 = new ImageFile(fileName3)

    console.log(`file1 == file2? ${await file.equals(file2)}`)
    console.log(`file2 == file3? ${await file2.equals(file3)}`)

  }
}
Program.main()
