// https://stackoverflow.com/questions/47610880/how-to-send-node-command-line-arguments-in-jest-test
process.argv = [
  'node',
  'Program.js',
  '--haystack-dir',
  'c:/haystack',
  '--needles-dir',
  'c:/needles'
]

import { MediaFileFactory } from '../src/lib/MediaFileFactory'
import { VideoFile } from '../src/lib/VideoFile'
import { ImageFile } from '../src/lib/ImageFile'
import { assert } from 'console'
import { MediaFile } from '../src/lib/MediaFile'

// '/Library/haystack/1.JPG' is 1557620823e163c4c69bf7970df6e007fed8741613ded73009dd93eed04586ce
// const fileName = '/Library/haystack/1.JPG'
// const videoFileName1 = '/Library/needles/11.MOV'
const imageFileName1 = module.path + '/data/a/1.png'
const imageFileName2 = module.path + '/data/a/2.png'
const imageFileName3 = module.path + '/data/b/2.png'
const imageFileName4 = module.path + '/data/c/1.png'

const videoFileName1 = module.path + '/data/a/1.mov'
const videoFileName2 = module.path + '/data/a/2.mov'
const videoFileName3 = module.path + '/data/b/2.mov'
const videoFileName4 = module.path + '/data/c/1.mov'

describe("Test file comparison", async () => {
  it("Test image dimensions", async () => {
    const factory = new MediaFileFactory()
    const image1 = <ImageFile> await factory.createMediaFile(imageFileName1)
    expect((await image1.getDimensions()).height).toBe(105)
    expect((await image1.getDimensions()).width).toBe(132)
  })

  it("Test same media type", async () => {
    const factory = new MediaFileFactory()
    const image1 = <ImageFile> await factory.createMediaFile(imageFileName1)
    const image2 = <ImageFile> await factory.createMediaFile(imageFileName2)
    const videoFile = <ImageFile> await factory.createMediaFile(videoFileName1)
    
    expect(await image1.sameMediaType(videoFile)).toBeFalsy()
    expect(await image1.sameMediaType(image2)).toBeTruthy()
  })

  it("Test image comparison", async () => {
    const factory = new MediaFileFactory()
    const image1 = <ImageFile> await factory.createMediaFile(imageFileName1)
    const image2 = <ImageFile> await factory.createMediaFile(imageFileName2)
    const image3 = <ImageFile> await factory.createMediaFile(imageFileName3)
    const image4 = <ImageFile> await factory.createMediaFile(imageFileName4)

    // two different images names and contents in the same directory. should return false
    expect(await image1.equals(image2)).toBeFalsy()
    
    // two of same image with same name in different directories. with same name and content, should return true
    expect(await image2.equals(image3)).toBeTruthy()
    
    // two of image with same name but different content, should return false.
    expect(await image1.equals(image4)).toBeFalsy()



    // const videoFile = new VideoFile(fileName)
    // const duration = await videoFile.getVideoDurationInSeconds()
    // console.log(`duration ${JSON.stringify(duration)}`);

    // const file = new ImageFile(fileName)
    // const fileType = await file.getFileMimeType()
    // const fileHash = await file.getChecksum()
    // const fileStats = await file.getTotalFileBytes()
    // console.log(`READ ${fileType} ${fileHash} ${fileName} stats ${JSON.stringify(fileStats)}`);
  })
})