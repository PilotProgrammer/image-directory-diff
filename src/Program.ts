import { ArgParser } from "./lib/ArgParser";
import { ImageDirectoryDiff } from "./lib/ImageDirectoryDiff";
import { Hash } from 'crypto'

const fs = require('fs');
const crypto = require('crypto')


exports.handler = async (event: any = {}): Promise<any> => {
  const prog = new ImageDirectoryDiff();
  // prog.main(event);
}

const argParser = new ArgParser();
let { haystackDir, needlesDir } = argParser.parseArgs();
console.log(`haystackDir: ${haystackDir} needlesDir: ${needlesDir}`)

const fileName = 'c:/needles/100_0148.JPG'

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
}());

export class Program {
  public static async main() {
    const sha = await checksumFile('sha256', fileName)
    console.log(`READ ${sha}`);
  }
}
Program.main()











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