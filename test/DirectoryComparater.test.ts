import { ImageDirectoryDiff, ImageDirectoryDiffEvent, ImageDirectoryDiffResult } from '../src/lib/ImageDirectoryDiff'
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

    // var array1 = ["A", "B", "C"];
    // var array2 = ["1", "2", "3", "4"];
    // const asdf = array1.flatMap(d => array2.map(v => d + v))


    const event: ImageDirectoryDiffEvent = {
      directoryPaths: [directoryA, directoryB, directoryC]
    }

    const diff = new ImageDirectoryDiff()
    const diffs = diff.determine(event)

    expect(diffs.diffResults.length == 3).toBeTruthy()
    let hitCount = 0

    diffs.diffResults.forEach(element => {
      if (element.directoryPathOne == directoryA && element.directoryPathTwo == directoryB) {
        
        // expect(element.filesInDirectoryOneExceptDirectoryTwo.length).toBe(2)
        // expect(element.filesInDirectoryTwoExceptDirectoryOne.length).toBe(0)
        // expect(element.filesInDirectoryOneExceptDirectoryTwo.includes())
        hitCount++
      } else if (element.directoryPathOne == directoryA && element.directoryPathTwo == directoryC) {
        expect(true).toBeTruthy()
        hitCount++
      } else if (element.directoryPathOne == directoryB && element.directoryPathTwo == directoryC) {
        expect(true).toBeTruthy()
        hitCount++
      }
    })

    // expect(hitCount).toBe(3)
  })
})