import React, { Component } from 'react'
import APIManager from "./APIManager"

class MarkerManager extends APIManager {

  MarkerManagerGetAll() {
    return this.getAllLocal()


  }

  MarkerManagerPostAndList(newMarker) {
    return this.postLocal(newMarker).then(() => this.getAllLocal())

  }

  MarkerManagerDeleteAndList(id) {
    return this.deleteLocal(id).then(() => this.getAllLocal()).catch(function() {
      alert("error")
  })
  }

  MarkerManagerPatchAndList(editedMarker, id) {
    return this.patchLocal(editedMarker, id).then(() => this.getAllLocal())
  }
}

export default new MarkerManager("markers")