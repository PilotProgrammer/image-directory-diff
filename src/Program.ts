import { LFService, LoggerFactoryOptions, LogGroupRule, LogLevel } from "typescript-logging";
import { ArgParser } from "./lib/ArgParser";
import { ImageDirectoryDiff, ImageDirectoryDiffEvent } from "./lib/ImageDirectoryDiff";


const options = new LoggerFactoryOptions()
  // .addLogGroupRule(new LogGroupRule(new RegExp("model.+"), LogLevel.Debug))
  .addLogGroupRule(new LogGroupRule(new RegExp(".+"), LogLevel.Info));

export const factory = LFService.createNamedLoggerFactory("LoggerFactory", options);

const argParser = new ArgParser();
const directories = argParser.parseArgs();
console.log(`directories: ${JSON.stringify(directories)}`)
export class Program {
  public static async main() {
    const event: ImageDirectoryDiffEvent = {
      directoryPaths: directories
    }

    const start = new Date().getTime();

    const diff = new ImageDirectoryDiff()
    const diffs = await diff.determine(event)
    const formatted = JSON.stringify(diffs, null, 2) // spacing level = 2

    let elapsed = new Date().getTime() - start;

    console.log(`start time ${JSON.stringify(start)} elapsed time ${JSON.stringify(elapsed)} diffs ${formatted}`)
  }
}


if (directories != null && directories.length >= 1) {
  if ((directories.length == 1 && directories[0] == 'test')) {
    console.log(`Running unit tests.`)
  } else {
    Program.main()
  }
} else {
  throw new Error(`You must provide a list of directories for which media files delta will be computed. Use --help for more info.`);
}