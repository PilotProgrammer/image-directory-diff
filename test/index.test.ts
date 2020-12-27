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

// '/Library/haystack/1.JPG' is 1557620823e163c4c69bf7970df6e007fed8741613ded73009dd93eed04586ce
// const fileName = '/Library/haystack/1.JPG'
const videoFileName1 = '/Library/needles/11.MOV'
const fileName = '/Library/needles/1.JPG'
const fileName2 = '/Library/needles/2.JPG'
const fileName3 = '/Library/haystack/2.JPG'

describe("Test the function", function () {

  it("Test the function specifically", async () => {
    console.log(`test`)

    const factory = new MediaFileFactory()
    await factory.createMediaFile(fileName)
    await factory.createMediaFile(videoFileName1)

    const videoFile = new VideoFile(fileName)
    const duration = await videoFile.getVideoDurationInSeconds()
    console.log(`duration ${JSON.stringify(duration)}`);

    const file = new ImageFile(fileName)
    const fileType = await file.getFileMimeType()
    const fileHash = await file.getChecksum()
    const fileStats = await file.getTotalFileBytes()
    console.log(`READ ${fileType} ${fileHash} ${fileName} stats ${JSON.stringify(fileStats)}`);

    const file2 = new ImageFile(fileName2)
    const file3 = new ImageFile(fileName3)

    console.log(`file1 == file2? ${await file.equals(file2)}`)
    console.log(`file2 == file3? ${await file2.equals(file3)}`)


  })
})