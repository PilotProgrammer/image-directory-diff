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



var crypto = require('crypto')
import { Hash } from 'crypto'

const fileName = 'c:/needles/100_0148.JPG'
// const fileName2 = 'c:/needles/100_0148-2.JPG'
// const fileName = 'c:/needles/test.txt'
const encoding = "utf8"

// option 1 start
const readStream = async (stream: any) => {
  console.log(`readStream ENTER!`)

  stream.setEncoding(encoding);

  return new Promise((resolve, reject) => {

    let data = ""
    let hash = crypto.createHash('sha256')

    console.log(`hash2-updated: `)
    stream.on('data', (chunk: any) => {
      hash.update(data, encoding)
      data += chunk
    });
    stream.on('end', () => {
      const results = hash.digest('hex')
      console.log(`hash2-end: ${results}`)
      resolve(data)
    });
    stream.on('error', (error: any) => {
      console.log(`hash2-error: ${error} `)
      reject(error)
    })

  })
}

const readStream3 = async (stream3: any) => {

  let hash3 = crypto.createHash('sha256')
  // let stream3 = fs.createReadStream(fileName)
  stream3.setEncoding(encoding);

  return new Promise((resolve, reject) => {

    stream3.on('data', function (data3: any) {
      hash3.update(data3, encoding)
      console.log(`hash3 updated`)
    })
    stream3.on('end', function () {
      const results3 = hash3.digest('hex')
      console.log(`hash3 done: ${results3} `)
      resolve(true)
    })

  })
}

const readStream5 = async (fd: any, stream?: any) => {

  var hash = crypto.createHash('sha256');
  hash.setEncoding('hex');

  // read all file and pipe it (write it) to the hash object
  fd.pipe(hash);

  var end = new Promise(function (resolve, reject) {
    hash.on('end', () => resolve(hash.read()));
    fd.on('error', reject); // or something like that. might need to close `hash`
  });

  return end
}


var inputStream = fs.createReadStream(fileName);

function checksumFile(algorithm: any, path: any) {
  return new Promise((resolve, reject) =>
    fs.createReadStream(path)
      .on('error', reject)
      .pipe(crypto.createHash(algorithm)
        .setEncoding('hex'))
      .once('finish', function (this: Hash) {
        resolve(this.read())
      })
  )
}

(async function () {
  const sha = await checksumFile('sha256', fileName)
  console.log(`READ ${sha}`);
}());

/*
console.log(`1 `)

var end = new Promise(function(resolve, reject) {
  console.log(`2 `)

    hash.on('end', () => {
      resolve(hash.read())
      console.log(`3 `)

    });

    console.log(`4 `)

    fd.on('error', reject); // or something like that. might need to close `hash`

    console.log(`4 `)

});

fd.pipe(hash);


(async function() {
  console.log(`5 `)

  let sha1sum = await end;

  console.log(`6 `)

  console.log(sha1sum);
}());

*/

/*
(async () => {

  // await new Promise(resolve => setTimeout(resolve, 5000));
  // await new Promise((resolve, reject) => {    r.pipe(w) })

  // console.log(`1 `)
  // const r = fs.createReadStream(fileName);
  // console.log(`2 `)
  // r.on('data', function (data3: any) {
  //   console.log(`got data`)
  // })
  // console.log(`3 `)
  // const w = fs.createWriteStream(fileName + ".2.jpg");
  // console.log(`4 `)
  // console.log(`5 `)

  // console.log(`~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~ FILE 2`)

  // const stream2_2 = fs.createReadStream(fileName2)
  // const text_2: any = await readStream(stream2_2)
  // console.log(`hash2 done `)

  // const stream3_2 = fs.createReadStream(fileName2)
  // const text3_2: any = await readStream3(stream3_2)
  // console.log(`hash3 done `)

  // const stream5_2 = fs.createReadStream(fileName)
  // const text5_2: any = await readStream5(stream5_2)
  // console.log(`hash5 done ${text5_2}`)

})();

*/



// export class Program {
//   public static async main() {
//     const stream2 = fs.createReadStream(fileName)
//     const text: any = await readStream(stream2)
//     console.log(`hash2 done: ${text.length} `)

//     var hash3 = crypto.createHash('sha256'),
//     stream3 = fs.createReadStream(fileName)
//     stream3.setEncoding(encoding);
//     stream3.on('data', function (data3: any) {
//       hash3.update(data3, encoding)
//       console.log(`hash3 updated`)
//     })
//     stream3.on('end', function () {
//       const results3 = hash3.digest('hex')
//       console.log(`hash3 done: ${results3} `)
//     })
//   }
// }
// Program.main()
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
// https://dev.to/cdanielsen/wrap-your-streams-with-promises-for-fun-and-profit-51ka








// ATTIC
/*
const readStream = async (stream: any) => {
  console.log(`readStream ENTER!`)

  stream.setEncoding(encoding);

  return new Promise((resolve, reject) => {

    let data = ""
    let hash = crypto.createHash('sha256')

    stream.on('data', (chunk: any) => {
      console.log(`hash2-updated: `)
      hash.update(data, encoding)
      data += chunk
    });
    stream.on('end', () => {
      const results = hash.digest('hex')
      console.log(`hash2-end: ${results}`)
      resolve(data)
    });
    stream.on('error', (error: any) => {
      console.log(`hash2-error: ${error} `)
      reject(error)
    })

  })
}
*/


/* WORKS!!

// https://stackoverflow.com/questions/18658612/obtaining-the-hash-of-a-file-using-the-stream-capabilities-of-crypto-module-ie
// see "Further polish, ECMAScript 2015"
const fs = require('fs');
const crypto = require('crypto')
const fileName = 'c:/needles/100_0148.JPG'

function checksumFile(algorithm, path) {
  return new Promise((resolve, reject) =>
    fs.createReadStream(path)
      .on('error', reject)
      .pipe(crypto.createHash(algorithm)
        .setEncoding('hex'))
      .once('finish', function () {
        resolve(this.read())
      })
  )
}

(async function () {
  const sha = await checksumFile('sha256', fileName)
  console.log(`READ ${sha}`);
}());

*/