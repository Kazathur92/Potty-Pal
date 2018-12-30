import APIManager from "./APIManager"

class BathroomManager extends APIManager {

  BathroomManagerGetAll(query) {
    return this.getAllMaps(query)


  }

  BathroomManagerPostAndList(newBathroom) {
    return this.postLocal(newBathroom).then(() => this.getAllLocal())

  }

  BathroomManagerDeleteAndList(id) {
    return this.deleteLocal(id).then(() => this.getAllLocal())
  }

  BathroomManagerPatchAndList(editedBathroom, id) {
    return this.patchLocal(editedBathroom, id).then(() => this.getAllLocal())
  }
}

export default new BathroomManager("bathrooms")