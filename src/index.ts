const fs = require('fs');

export class ImageDirectoryDifferenceDeterminer {
  public determine(event: any) {
    console.log(process.argv);

    console.log('Hello World!');
    const response = 'Hello World!' + JSON.stringify(event, null, 2);

    let fileList: [] = []
    // const returnList = this.walkFiles('c:/android-sdcard-11-17-19/Camera/', fileList)
    // const returnList = this.walkFiles('C:/Users/Garrett/Documents/AsusPictures/', fileList)
    // console.log(JSON.stringify(returnList.length))
    return response;
  }

}

export class Directory {

  public constructor(private directoryName: string) {
    this._allFiles = this.walkFiles(this.directoryName, [])
  }

  private _allFiles: string;

  get allFiles() {
    return this._allFiles
  }

  private walkFiles(dir: any, filelist: any): any {
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
  const prog = new ImageDirectoryDifferenceDeterminer();
  // prog.main(event);
}

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
  throw new Error(`You must provide the haystack directory. Use --help for more info.`)
}

if (!argv.needlesDir) {
  throw new Error(`You must provide the needles directory. Use --help for more info.`)
}

let haystackDir = argv.haystackDir
let needlesDir = argv.needlesDir

console.log(`haystackDir: ${haystackDir} needlesDir: ${needlesDir}`)

// exports.handler()


var crypto = require('crypto')

function checksum(str?: any, algorithm?: any, encoding?: any) {
  return crypto
    .createHash(algorithm || 'md5')
    .update(str, 'utf8')
    .digest(encoding || 'hex')
}

let checksum1 = checksum('This is my test text') // e53815e8c095e270c6560be1bb76a65d
let checksum2 = checksum('This is my test text', 'sha1') // cd5855be428295a3cc1793d6e80ce47562d23def

console.log(`checksum1: ${checksum1} checksum2: ${checksum2}`)




// resources
// https://www.html5rocks.com/en/tutorials/webgl/typed_arrays/
// https://medium.com/javascript-in-plain-english/how-to-read-files-with-buffer-stream-in-node-js-d77de6ae6b49
// https://code.visualstudio.com/docs/nodejs/nodejs-debugging#_launch-configuration-attributes
// https://stackoverflow.com/questions/31169259/how-to-debug-typescript-files-in-visual-studio-code for preLaunchTask idea
// https://stackoverflow.com/questions/18510897/how-to-compare-two-images-using-node-js
// ** https://nodejs.org/en/knowledge/command-line/how-to-parse-command-line-arguments/
// ** https://blog.abelotech.com/posts/calculate-checksum-hash-nodejs-javascript/
// https://stackoverflow.com/questions/39494058/behaviorsubject-vs-observable
