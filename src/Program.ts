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

let checksum1 = checksum('This is my test text') // e53815e8c095e270c6560be1bb76a65d
let checksum2 = checksum('This is my test text', 'sha1') // cd5855be428295a3cc1793d6e80ce47562d23def

console.log(`checksum1: ${checksum1} checksum2: ${checksum2}`)


var hash = crypto.createHash('sha256'),
stream = fs.createReadStream('c:/needles/100_0148.JPG')

stream.on('data', function (data: any) {
  hash.update(data, 'utf8')
  console.log(`hash updated`)
})

stream.on('end', function () {
  const results = hash.digest('hex') // 34f7a3113803f8ed3b8fd7ce5656ebec
  
  console.log(`hash done: ${results} `)
})


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
