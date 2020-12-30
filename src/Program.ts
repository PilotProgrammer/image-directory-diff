import { LoggerFactory, LoggerFactoryOptions, LFService, LogGroupRule, LogLevel } from "typescript-logging";

import { ArgParser } from "./lib/ArgParser";
import { MediaFile } from "./lib/MediaFile";
import { ImageDirectoryDiff, ImageDirectoryDiffEvent } from "./lib/ImageDirectoryDiff";
import { ImageFile } from "./lib/ImageFile";
import { VideoFile } from "./lib/VideoFile";
import { MediaFileFactory } from "./lib/MediaFileFactory";

const options = new LoggerFactoryOptions()
  // .addLogGroupRule(new LogGroupRule(new RegExp("model.+"), LogLevel.Debug))
  .addLogGroupRule(new LogGroupRule(new RegExp(".+"), LogLevel.Info));

export const factory = LFService.createNamedLoggerFactory("LoggerFactory", options);

exports.handler = async (event: any = {}): Promise<any> => {
  const prog = new ImageDirectoryDiff();
  // prog.main(event);
}

const argParser = new ArgParser();
const directories = argParser.parseArgs();
// console.log(`haystackDir: ${haystackDir} needlesDir: ${needlesDir}`)
export class Program {
  public static async main() {
    const event: ImageDirectoryDiffEvent = {
      directoryPaths: directories
    }

    const diff = new ImageDirectoryDiff()
    const diffs = await diff.determine(event)
    const formatted = JSON.stringify(diffs, null, 2) // spacing level = 2

    console.log(`diffs ${formatted}`)
  }
}
Program.main()
