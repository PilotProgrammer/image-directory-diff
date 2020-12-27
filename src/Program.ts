import { ArgParser } from "./lib/ArgParser";
import { File } from "./lib/File";
import { ImageDirectoryDiff } from "./lib/ImageDirectoryDiff";

exports.handler = async (event: any = {}): Promise<any> => {
  const prog = new ImageDirectoryDiff();
  // prog.main(event);
}

const argParser = new ArgParser();
let { haystackDir, needlesDir } = argParser.parseArgs();
console.log(`haystackDir: ${haystackDir} needlesDir: ${needlesDir}`)

// '/Library/haystack/1.JPG' is 1557620823e163c4c69bf7970df6e007fed8741613ded73009dd93eed04586ce
// const fileName = '/Library/haystack/1.JPG'
const fileName = '/Library/needles/1.JPG'
const fileName2 = '/Library/needles/2.JPG'
const fileName3 = '/Library/haystack/2.JPG'


export class Program {
  public static async main() {
    const file = new File(fileName)
    const fileType = await file.getFileMimeType()
    const fileHash = await file.getChecksum()
    const fileStats = await file.getTotalFileBytes()
    console.log(`READ ${fileType} ${fileHash} ${fileName} stats ${JSON.stringify(fileStats)}`);

    const file2 = new File(fileName2)
    const file3 = new File(fileName3)

    console.log(`file1 == file2? ${await file.equals(file2)}`)
    console.log(`file2 == file3? ${await file2.equals(file3)}`)

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