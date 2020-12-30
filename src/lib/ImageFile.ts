import { MediaFile } from "./MediaFile";
const sizeOf = require('image-size');

export interface Dimensions { width: number, height: number }
export class ImageFile extends MediaFile<ImageFile> {
  private _dimensions: Dimensions

  public async equals(otherFile: MediaFile<ImageFile>) {
    if (!(await super.equals(otherFile))) return false
    if (!(await this.sameDimensions(<ImageFile>otherFile))) return false
    
    return true
  }

  public async sameDimensions(otherImage: ImageFile) {
    const myDimensions = await this.getDimensions()
    const yourDimensions = await (<ImageFile>otherImage).getDimensions()
    if ((myDimensions.height == yourDimensions.height) && (myDimensions.width == yourDimensions.width)) {
      return true
    } else {
      return false
    }
  }

  public async getDimensions(): Promise<Dimensions> {
    if (this._dimensions == null) {
      this._dimensions = await new Promise((resolve, reject) => {
        sizeOf(this.filePath, function (err: any, dimensions: Dimensions) {
          if (err != null) {
            reject(err)
          } else {
            resolve(dimensions)
          }
        })
      })
    }

    return this._dimensions
  }
}