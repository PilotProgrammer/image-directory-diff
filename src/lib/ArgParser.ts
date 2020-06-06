

export class ArgParser {
  public parseArgs() {
    const yargs = require('yargs');
    const argv = yargs
      .option('haystack-dir', {
        alias: 'h',
        description: 'Providee the directory that contains the images in which we are searching for images in the needles directory.',
        type: 'string',
      })
      .option('needles-dir', {
        alias: 'n',
        description: 'Provide the directory that contains the images to search for within the haystack directory.',
        type: 'string',
      })
      .argv;
    // end
    if (!argv.haystackDir) {
      throw new Error(`You must provide the haystack directory. Use --help for more info.`);
    }
    if (!argv.needlesDir) {
      throw new Error(`You must provide the needles directory. Use --help for more info.`);
    }
    let haystackDir = argv.haystackDir;
    let needlesDir = argv.needlesDir;
    return { haystackDir, needlesDir };
  }
}
