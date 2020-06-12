import { ArgParser } from "./lib/ArgParser";
import { ImageDirectoryDiff } from "./lib/ImageDirectoryDiff";

export const fs = require('fs');

exports.handler = async (event: any = {}): Promise<any> => {
  const prog = new ImageDirectoryDiff();
  // prog.main(event);
}

const argParser = new ArgParser();
let { haystackDir, needlesDir } = argParser.parseArgs();

console.log(`haystackDir: ${haystackDir} needlesDir: ${needlesDir}`)

// exports.handler()


var crypto = require('crypto')

function checksum(str?: any, algorithm?: any, encoding?: any) {
  return crypto
    .createHash(algorithm || 'md5')
    .update(str, 'utf8')
    .digest(encoding || 'hex')
}

// let checksum1 = checksum('This is my test text') // e53815e8c095e270c6560be1bb76a65d
// let checksum2 = checksum('This is my test text', 'sha1') // cd5855be428295a3cc1793d6e80ce47562d23def
// console.log(`checksum1: ${checksum1} checksum2: ${checksum2}`)

const fileName = 'c:/needles/100_0148.JPG'


const encoding = "utf8"

// option 1 start
const readStream = async function readStream(stream: any) {

  stream.setEncoding(encoding);

  return new Promise((resolve, reject) => {
    let data = "";
    var hash = crypto.createHash('sha256')


    stream.on("data", (chunk: any) => {
      console.log(`hash2-updated: `)
      hash.update(data, encoding)
      data += chunk
    });
    stream.on("end", () => {
      const results = hash.digest('hex') 
      console.log(`hash2-end: ${results}`)
      resolve(data)
    });
    stream.on("error", (error: any) => {
      console.log(`hash2-error: ${error} `)
      reject(error)
    })
  });
}


export class Program {
  public static async main() {
    const stream2 = fs.createReadStream(fileName)
    const text: any = await readStream(stream2)
    console.log(`hash2 done: ${text.length} `)

    var hash = crypto.createHash('sha256'),
      stream = fs.createReadStream(fileName)
    stream.setEncoding(encoding);
stream.on('data', function (data: any) {
      hash.update(data, encoding)
  console.log(`hash updated`)
})
stream.on('end', function () {
      const results = hash.digest('hex') 
  console.log(`hash done: ${results} `)
})
  }
}
Program.main()
// option 1 end



// option 2 begin
/*
var fd = fs.createReadStream('/some/file/name.txt');
var hash = crypto.createHash('sha1');
hash.setEncoding('hex');
// read all file and pipe it (write it) to the hash object
fd.pipe(hash);

var end = new Promise(function (resolve, reject) {
  hash.on('end', () => resolve(hash.read()));
  fd.on('error', reject); // or something like that. might need to close `hash`
});
(async function () {
  let sha1sum = await end;
  console.log(sha1sum);
}());*/
// option 2 end


// resources
// https://www.html5rocks.com/en/tutorials/webgl/typed_arrays/
// https://medium.com/javascript-in-plain-english/how-to-read-files-with-buffer-stream-in-node-js-d77de6ae6b49
// https://code.visualstudio.com/docs/nodejs/nodejs-debugging#_launch-configuration-attributes
// https://stackoverflow.com/questions/31169259/how-to-debug-typescript-files-in-visual-studio-code for preLaunchTask idea
// https://stackoverflow.com/questions/18510897/how-to-compare-two-images-using-node-js
// ** https://nodejs.org/en/knowledge/command-line/how-to-parse-command-line-arguments/
// ** https://blog.abelotech.com/posts/calculate-checksum-hash-nodejs-javascript/
// https://stackoverflow.com/questions/39494058/behaviorsubject-vs-observable
// https://stackoverflow.com/questions/30423413/node-js-streams-vs-observables
// ** https://stackoverflow.com/questions/33599688/how-to-use-es8-async-await-with-streams
// ** https://humanwhocodes.com/snippets/2019/05/nodejs-read-stream-promise/