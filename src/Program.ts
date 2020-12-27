import { LoggerFactory, LoggerFactoryOptions, LFService, LogGroupRule, LogLevel } from "typescript-logging";

import { ArgParser } from "./lib/ArgParser";
import { File } from "./lib/File";
import { ImageDirectoryDiff } from "./lib/ImageDirectoryDiff";

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
const fileName = '/Library/needles/1.JPG'
const fileName2 = '/Library/needles/2.JPG'
const fileName3 = '/Library/haystack/2.JPG'


export class Program {
  public static async main() {
    const file = new File(fileName)
    const fileType = await file.getFileMimeType()
    const fileHash = await file.getChecksum()
    const fileStats = await file.getTotalFileBytes()
    console.log(`READ ${fileType} ${fileHash} ${fileName} stats ${JSON.stringify(fileStats)}`);

    const file2 = new File(fileName2)
    const file3 = new File(fileName3)

    console.log(`file1 == file2? ${await file.equals(file2)}`)
    console.log(`file2 == file3? ${await file2.equals(file3)}`)

  }
}
Program.main()
