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
    const event: ImageDirectoryDiffEvent = {
      directoryPaths: [directoryA, directoryB, directoryC]
    }

    var array = ["apple", "banana", "lemon", "mango"];

    const diff = new ImageDirectoryDiff()
    const diffs = diff.determine(event)



  })
})