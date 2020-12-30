

export class ArgParser {
  public parseArgs() {
    /*
    const yargs = require('yargs');
    const argv = yargs
    .option('compare-directories', {
      alias: 'c',
      description: 'Provide directories to find video/image file deltas. Directories should be separated by spaces (e.g. /Lib/dir1 /var/dir2)',
      type: 'string',
    }
    ).argv;
    const directoriesString = argv['compare-directories']
    */

    const compareDirectoriesKey = 'compare-directories='
    
    let directoriesString = ''
    for (const arg of process.argv) {
      if (arg.indexOf(compareDirectoriesKey) != -1) {
        directoriesString = arg.substr(compareDirectoriesKey.length)
      }
    }
    const directories = directoriesString.split(' ')
    console.log(`directories ${directories} argv ${JSON.stringify(process.argv)}`)

    if (directories == null || directories.length <= 1) {
      throw new Error(`You must provide a list of directories for which media files delta will be computed. Use --help for more info.`);
    }

    return directories
  }
}
