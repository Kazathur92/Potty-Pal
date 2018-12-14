import React, { Component } from 'react'
import APIManager from "./APIManager"

class BathroomManager extends APIManager {

  BathroomManagerGetAll(...props) {
    return this.getAllMaps(...props)


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