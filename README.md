# image-directory-diff

### Purpose

My goal with this project was to make image/video backup more simple. I take extra caution when it comes to backups, with literally 4 backups of all my media files on various internal and external HDD. 

At one point I had only iOS devices, and so just used iPhoto. After incorporating other devices (Android, higher power Nikon camera, etc.), the backup process wasn't going to work with iPhoto. I've also used other backup tools, and rather than suffer from "vender lock," with potential file export and library merging issues if I switched "vendor" again, I instead just wanted to use a good old file system copy to maintain backups. 

The problem that invariably arises when you back up a proliferation of media files, is that you may have deltas between various backups. Rather than comb through that by hand, this utility will do that on my behalf. I don't trust just using file name to make sure that a media file is backed up, so this utility goes the "extra mile" in making those comparisons -- ensuring to me that a given media file exists across all backups, with 100% certainty.
### Overview

This utility compares image and video files in separate directories. When provided a set of directories, the app iterates the files in each directory, and checks the other directories for the existence of the file. The check for "equality" between two files is multi-faceted.
* For images and videos, the following is compared:
  * file name (not path, obviously)
  * file size
  * file mime type
  * SHA-256 checksum

For video files only, the video duration is compared. For image files only, the resolution is compared.

With 4 directories provided, the program will output the deltas between each of the pairs of directories. You should get nCr = n! / r! * (n - r)! = 6 comparisons, like the following (4 directories, choose 2), which accounts for comparisons between all the directories:
* A to B
* A to C
* A to D
* B to C
* B to D
* C to D

WARNING: This project uses rudimentary caching of the file stats (hash values, video duration, etc.). It is assumed that we are not trying to hit a "moving target" -- in other words, the files that are in the directories which are being compared should not be mutated in any way while the process itself is running.

### Usage

To run this project, first install dependencies
```bash
npm install
```

Make sure all systems go by running unit tests
```bash
npm test
```

To get the differences between directories, run this command, with the list of directory paths separated by spaces
```bash
npm run start "compare-directories=C:\Users\User1\Documents\MyPictures\2020-november D:\MyPictures\2020-november F:\photo-backup\MyPictures\2020-november G:\MyPictures\2020-november"
```

The above back command will then output a JSON object which contains the comparisons of each pair of directories in the provided list. Each "comparison" between a pair of directories will be a separate JSON object within the diffResults JSON array. If "filesInDirectoryOneExceptDirectoryTwo" and "filesInDirectoryTwoExceptDirectoryOne" are both empty lists for a given comparison, then that is indicative that the file contents (media files) of the two directories are the same.
```json
{
  "diffResults": [
    {
      "directoryPathOne": "C:\\Users\\User1\\Documents\\MyPictures\\2020-november",
      "directoryPathTwo": "D:\\MyPictures\\2020-november",
      "filesInDirectoryOneExceptDirectoryTwo": [],
      "filesInDirectoryTwoExceptDirectoryOne": [
        "D:\\MyPictures\\2020-november\\DSC_0004-2.MOV",
        "D:\\MyPictures\\2020-november\\DSC_0005-2.MOV",
        "D:\\MyPictures\\2020-november\\DSC_0015-2.MOV",
        "D:\\MyPictures\\2020-november\\DSC_0021-2.MOV",
        "D:\\MyPictures\\2020-november\\DSC_0023-2.JPG",
        "D:\\MyPictures\\2020-november\\DSC_0024-2.JPG",
        "D:\\MyPictures\\2020-november\\DSC_0025-2.JPG",
        "D:\\MyPictures\\2020-november\\DSC_0026-2.JPG",
        "D:\\MyPictures\\2020-november\\DSC_0027-2.JPG"
      ]
    },
    {
      "directoryPathOne": "C:\\Users\\User1\\Documents\\MyPictures\\2020-november",
      "directoryPathTwo": "F:\\photo-backup\\MyPictures\\2020-november",
      "filesInDirectoryOneExceptDirectoryTwo": [],
      "filesInDirectoryTwoExceptDirectoryOne": [
        "F:\\photo-backup\\MyPictures\\2020-november\\DSC_0004-2.MOV",
        "F:\\photo-backup\\MyPictures\\2020-november\\DSC_0005-2.MOV",
        "F:\\photo-backup\\MyPictures\\2020-november\\DSC_0015-2.MOV",
        "F:\\photo-backup\\MyPictures\\2020-november\\DSC_0021-2.MOV",
        "F:\\photo-backup\\MyPictures\\2020-november\\DSC_0023-2.JPG",
        "F:\\photo-backup\\MyPictures\\2020-november\\DSC_0024-2.JPG",
        "F:\\photo-backup\\MyPictures\\2020-november\\DSC_0025-2.JPG",
        "F:\\photo-backup\\MyPictures\\2020-november\\DSC_0026-2.JPG",
        "F:\\photo-backup\\MyPictures\\2020-november\\DSC_0027-2.JPG"
      ]
    },
    {
      "directoryPathOne": "C:\\Users\\User1\\Documents\\MyPictures\\2020-november",
      "directoryPathTwo": "G:\\MyPictures\\2020-november",
      "filesInDirectoryOneExceptDirectoryTwo": [],
      "filesInDirectoryTwoExceptDirectoryOne": []
    },
    {
      "directoryPathOne": "D:\\MyPictures\\2020-november",
      "directoryPathTwo": "F:\\photo-backup\\MyPictures\\2020-november",
      "filesInDirectoryOneExceptDirectoryTwo": [],
      "filesInDirectoryTwoExceptDirectoryOne": []
    },
    {
      "directoryPathOne": "D:\\MyPictures\\2020-november",
      "directoryPathTwo": "G:\\MyPictures\\2020-november",
      "filesInDirectoryOneExceptDirectoryTwo": [
        "D:\\MyPictures\\2020-november\\DSC_0004-2.MOV",
        "D:\\MyPictures\\2020-november\\DSC_0005-2.MOV",
        "D:\\MyPictures\\2020-november\\DSC_0015-2.MOV",
        "D:\\MyPictures\\2020-november\\DSC_0021-2.MOV",
        "D:\\MyPictures\\2020-november\\DSC_0023-2.JPG",
        "D:\\MyPictures\\2020-november\\DSC_0024-2.JPG",
        "D:\\MyPictures\\2020-november\\DSC_0025-2.JPG",
        "D:\\MyPictures\\2020-november\\DSC_0026-2.JPG",
        "D:\\MyPictures\\2020-november\\DSC_0027-2.JPG"
      ],
      "filesInDirectoryTwoExceptDirectoryOne": []
    },
    {
      "directoryPathOne": "F:\\photo-backup\\MyPictures\\2020-november",
      "directoryPathTwo": "G:\\MyPictures\\2020-november",
      "filesInDirectoryOneExceptDirectoryTwo": [
        "F:\\photo-backup\\MyPictures\\2020-november\\DSC_0004-2.MOV",
        "F:\\photo-backup\\MyPictures\\2020-november\\DSC_0005-2.MOV",
        "F:\\photo-backup\\MyPictures\\2020-november\\DSC_0015-2.MOV",
        "F:\\photo-backup\\MyPictures\\2020-november\\DSC_0021-2.MOV",
        "F:\\photo-backup\\MyPictures\\2020-november\\DSC_0023-2.JPG",
        "F:\\photo-backup\\MyPictures\\2020-november\\DSC_0024-2.JPG",
        "F:\\photo-backup\\MyPictures\\2020-november\\DSC_0025-2.JPG",
        "F:\\photo-backup\\MyPictures\\2020-november\\DSC_0026-2.JPG",
        "F:\\photo-backup\\MyPictures\\2020-november\\DSC_0027-2.JPG"
      ],
      "filesInDirectoryTwoExceptDirectoryOne": []
    }
  ]
}
```