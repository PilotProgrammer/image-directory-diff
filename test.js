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


/*
var fd = fs.createReadStream(fileName);
var hash = crypto.createHash('sha1');
hash.setEncoding('hex');
// read all file and pipe it (write it) to the hash object
fd.pipe(hash);

var end = new Promise(function(resolve, reject) {
    hash.on('end', () => resolve(hash.read()));
    fd.on('error', reject); // or something like that. might need to close `hash`
});

(async function() {
    let sha1sum = await end;
    console.log('sha1sum');
}());

*/


/*


var fd = fs.createReadStream(fileName);
var hash = crypto.createHash('sha256');
hash.setEncoding('hex');
// read all file and pipe it (write it) to the hash object

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



