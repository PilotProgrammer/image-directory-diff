# image-directory-diff

This utility compares image and video files in separate directories. When provided a set of directories, the app iterates the files in each directory, and checks the other directories for the existence of the file. The check for "equality" between two files is multi-faceted.
* For images and videos, the following is compared:
  * file name (not path, obviously)
  * file size
  * file mime type
  * SHA-256 checksum

For video files only, the video duration is compared. For image files only, the resolution is compared.

With 4 directories provided, the program will output the deltas between each of the pairs of directories. You should get (n-1)! comparisons, like the following, which accounts for comparisons between all the directories:
* A to B
* A to C
* A to D
* B to C
* B to D
* C to D

WARNING: This project uses rudimentary caching of the file stats (hash values, video duration, etc.). It is assumed that we are not trying to hit a "moving target" -- in other words, the files that are in the directories which are being compared should not be mutated in any way while the process itself is running.

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

The above back command will then output a JSON object which contains the comparisons of each pair of directories in the provided list
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