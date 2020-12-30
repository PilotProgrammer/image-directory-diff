import { ImageDirectoryDiff, ImageDirectoryDiffEvent, ImageDirectoryDiffResult } from '../src/lib/ImageDirectoryDiff'

import { imageFileName1, imageFileName2, imageFileName3, imageFileName4, videoFileName1, videoFileName2, videoFileName4, videoFileName3
} from './Common.tests'

process.argv = [
  'node',
  'Program.js',
  '--haystack-dir',
  'c:/haystack',
  '--needles-dir',
  'c:/needles'
]

const directoryA = module.path + '/data/a'
const directoryB = module.path + '/data/b'
const directoryC = module.path + '/data/c'

describe("Test file comparison", function () {
  it("Test image dimensions", async () => {
    const event: ImageDirectoryDiffEvent = {
      directoryPaths: [directoryA, directoryB, directoryC]
    }

    const diff = new ImageDirectoryDiff()
    const diffs = diff.determine(event)

    expect(diffs.diffResults.length == 3).toBeTruthy()
    let hitCount = 0

    diffs.diffResults.forEach(element => {
      if (element.directoryPathOne == directoryA && element.directoryPathTwo == directoryB) {
        expect(element.filesInDirectoryOneExceptDirectoryTwo.length).toBe(2)
        expect(element.filesInDirectoryTwoExceptDirectoryOne.length).toBe(0)

        expect(element.filesInDirectoryOneExceptDirectoryTwo.includes(videoFileName1))
        expect(element.filesInDirectoryOneExceptDirectoryTwo.includes(imageFileName1))
        
        hitCount++
      } else if (element.directoryPathOne == directoryB && element.directoryPathTwo == directoryC) {
        expect(element.filesInDirectoryOneExceptDirectoryTwo.length).toBe(2)
        expect(element.filesInDirectoryTwoExceptDirectoryOne.length).toBe(2)

        expect(element.filesInDirectoryOneExceptDirectoryTwo.includes(videoFileName3))
        expect(element.filesInDirectoryOneExceptDirectoryTwo.includes(imageFileName3))

        expect(element.filesInDirectoryTwoExceptDirectoryOne.includes(videoFileName4))
        expect(element.filesInDirectoryTwoExceptDirectoryOne.includes(imageFileName4))

        hitCount++
      } else if (element.directoryPathOne == directoryA && element.directoryPathTwo == directoryC) {
        expect(element.filesInDirectoryOneExceptDirectoryTwo.length).toBe(4)
        expect(element.filesInDirectoryTwoExceptDirectoryOne.length).toBe(2)

        expect(element.filesInDirectoryOneExceptDirectoryTwo.includes(videoFileName1))
        expect(element.filesInDirectoryOneExceptDirectoryTwo.includes(imageFileName1))
        expect(element.filesInDirectoryOneExceptDirectoryTwo.includes(videoFileName2))
        expect(element.filesInDirectoryOneExceptDirectoryTwo.includes(imageFileName2))

        expect(element.filesInDirectoryTwoExceptDirectoryOne.includes(videoFileName4))
        expect(element.filesInDirectoryTwoExceptDirectoryOne.includes(imageFileName4))

        hitCount++
      }
    })

    expect(hitCount).toBe(3)
  })
})