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