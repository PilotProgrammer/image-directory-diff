// https://stackoverflow.com/questions/47610880/how-to-send-node-command-line-arguments-in-jest-test

import { mockArgs, imageFileName1, imageFileName2, imageFileName3, imageFileName4, videoFileName1, videoFileName2, videoFileName4 
} from './Common.tests'

process.argv = mockArgs

import { ImageFile } from '../src/lib/ImageFile'
import { MediaFileFactory } from '../src/lib/MediaFileFactory'
import { VideoFile } from '../src/lib/VideoFile'

describe("Test file comparison", function() {
  it("Test image dimensions", async () => {
    const factory = new MediaFileFactory()
    const image1 = <ImageFile> await (await factory.createMediaFile(imageFileName1)).contents()
    expect((await image1.getDimensions()).height).toBe(105)
    expect((await image1.getDimensions()).width).toBe(132)
  })

  it("Test image sameDimensions", async () => {
    const factory = new MediaFileFactory()
    const image1 = <ImageFile> await (await factory.createMediaFile(imageFileName1)).contents()
    const image2 = <ImageFile> await (await factory.createMediaFile(imageFileName2)).contents()
    const image3 = <ImageFile> await (await factory.createMediaFile(imageFileName3)).contents()
    const image4 = <ImageFile> await (await factory.createMediaFile(imageFileName4)).contents()
    expect(await image1.sameDimensions(image2)).toBeFalsy()
    expect(await image3.sameDimensions(image4)).toBeTruthy()
  })

  it("Test video sameVideoDurationInSeconds", async () => {
    const factory = new MediaFileFactory()
    const videoFile1 = <VideoFile> await (await factory.createMediaFile(videoFileName1)).contents()
    const videoFile2 = <VideoFile> await (await factory.createMediaFile(videoFileName2)).contents()
    const videoFile4 = <VideoFile> await (await factory.createMediaFile(videoFileName4)).contents()
    expect(await videoFile1.sameVideoDurationInSeconds(videoFile2)).toBeFalsy()
    expect(await videoFile2.sameVideoDurationInSeconds(videoFile4)).toBeTruthy()
  })

  // if (!(await this.sameFileName(otherFile))) return false
  it("Test mediafile sameFileName", async () => {
    const factory = new MediaFileFactory()
    const videoFile1 = <VideoFile> await (await factory.createMediaFile(videoFileName1)).contents()
    const videoFile2 = <VideoFile> await (await factory.createMediaFile(videoFileName2)).contents()
    const videoFile4 = <VideoFile> await (await factory.createMediaFile(videoFileName4)).contents()
    expect(await videoFile1.sameFileName(videoFile4)).toBeTruthy()
    expect(await videoFile2.sameFileName(videoFile4)).toBeFalsy()
  })

  // if (!(await this.sameHash(otherFile))) return false
  it("Test mediafile sameHash", async () => {
    const factory = new MediaFileFactory()
    const videoFile1 = <VideoFile> await (await factory.createMediaFile(videoFileName1)).contents()
    const videoFile2 = <VideoFile> await (await factory.createMediaFile(videoFileName2)).contents()
    const videoFile4 = <VideoFile> await (await factory.createMediaFile(videoFileName4)).contents()
    expect(await videoFile1.sameHash(videoFile4)).toBeFalsy()
    expect(await videoFile2.sameHash(videoFile4)).toBeTruthy()
  })

  // if (!(await this.sameTotalFileBytes(otherFile))) return false
  it("Test mediafile sameTotalFileBytes", async () => {
    const factory = new MediaFileFactory()
    const videoFile1 = <VideoFile> await (await factory.createMediaFile(videoFileName1)).contents()
    const videoFile2 = <VideoFile> await (await factory.createMediaFile(videoFileName2)).contents()
    const videoFile4 = <VideoFile> await (await factory.createMediaFile(videoFileName4)).contents()
    expect(await videoFile1.sameTotalFileBytes(videoFile4)).toBeFalsy()
    expect(await videoFile2.sameTotalFileBytes(videoFile4)).toBeTruthy()
  })

  // if (!(await this.sameFileMimeType(otherFile))) return false
  it("Test mediafile sameFileMimeType", async () => {
    const factory = new MediaFileFactory()
    const videoFile1 = <VideoFile> await (await factory.createMediaFile(videoFileName1)).contents()
    const videoFile2 = <VideoFile> await (await factory.createMediaFile(videoFileName2)).contents()
    const imageFile1 = <ImageFile> await (await factory.createMediaFile(imageFileName1)).contents()
    expect(await videoFile1.sameFileMimeType(imageFile1)).toBeFalsy()
    expect(await videoFile1.sameFileMimeType(videoFile2)).toBeTruthy()
  })

  it("Test image comparison", async () => {
    const factory = new MediaFileFactory()
    const image1 = <ImageFile> await (await factory.createMediaFile(imageFileName1)).contents()
    const image2 = <ImageFile> await (await factory.createMediaFile(imageFileName2)).contents()
    const image3 = <ImageFile> await (await factory.createMediaFile(imageFileName3)).contents()
    const image4 = <ImageFile> await (await factory.createMediaFile(imageFileName4)).contents()

    // two different images names and contents in the same directory. should return false
    expect(await image1.equals(image2)).toBeFalsy()
    
    // two of same image with same name in different directories. with same name and content, should return true
    expect(await image2.equals(image3)).toBeTruthy()
    
    // two of image with same name but different content, should return false.
    expect(await image1.equals(image4)).toBeFalsy()
  })
})