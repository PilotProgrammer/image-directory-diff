import { LoggerFactory, LoggerFactoryOptions, LFService, LogGroupRule, LogLevel } from "typescript-logging";

import { ArgParser } from "./lib/ArgParser";
import { MediaFile } from "./lib/MediaFile";
import { ImageDirectoryDiff } from "./lib/ImageDirectoryDiff";
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
let { haystackDir, needlesDir } = argParser.parseArgs();
console.log(`haystackDir: ${haystackDir} needlesDir: ${needlesDir}`)
export class Program {
  public static async main() {

  }
}
Program.main()
