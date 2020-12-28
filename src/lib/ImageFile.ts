import { MediaFile } from "./MediaFile";
const sizeOf = require('image-size');

export interface Dimensions { width: number, height: number }
export class ImageFile extends MediaFile {
  private _dimensions: Dimensions

  public async equals(otherFile: MediaFile) {
    if (!this.sameMediaType(otherFile)) return false
    const otherImage = <ImageFile> otherFile
    if (!(await this.sameDimensions(otherImage))) return false
    if (!super.equals(otherFile)) return false
    
    return true
  }

  public async sameMediaType(otherFile: MediaFile) {
    if ((otherFile instanceof ImageFile) == true) {
      return true
    }

    return false
  }

  public async sameDimensions(otherImage: ImageFile) {
    const myDimensions = await this.getDimensions()
    const yourDimensions = await otherImage.getDimensions()
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
