const fs = require('fs');

// TODOGG: https://stackoverflow.com/questions/18510897/how-to-compare-two-images-using-node-js
export class Program {
  public main(event: any) {
    console.log(process.argv);

    console.log('Hello World!');
    const response = 'Hello World!' + JSON.stringify(event, null, 2);

    let fileList: [] = []
    // const returnList = this.walkFiles('c:/android-sdcard-11-17-19/Camera/', fileList)
    const returnList = this.walkFiles('C:/Users/Garrett/Documents/AsusPictures/', fileList)
    console.log(JSON.stringify(returnList.length))
    return response;
  }

  public walkFiles(dir: any, filelist: any): any {
    let files = fs.readdirSync(dir);
    filelist = filelist || [];

    for (let file of files) {
      if (fs.statSync(dir + file).isDirectory()) {
        filelist = this.walkFiles(dir + file + '/', filelist);
      }
      else {
        filelist.push(file);
      }
    }
    return filelist;
  };

}

exports.handler = async (event: any = {}): Promise<any> => {
  const prog = new Program();
  prog.main(event);
}

const yargs = require('yargs');

// https://nodejs.org/en/knowledge/command-line/how-to-parse-command-line-arguments/
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
  throw new Error(`You must provide the haystack directory. Use --help for more info.`)
}

if (!argv.needlesDir) {
  throw new Error(`You must provide the needles directory. Use --help for more info.`)
}

let haystackDir = argv.haystackDir
let needlesDir = argv.needlesDir

console.log(`haystackDir: ${haystackDir} needlesDir: ${needlesDir}`)

// exports.handler()

