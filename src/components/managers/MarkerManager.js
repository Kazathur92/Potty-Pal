import React, { Component } from 'react'
import APIManager from "./APIManager"

class MarkerManager extends APIManager {


MarkerManagerGetAll() {
  return this.getAllLocal()


}

  MarkerManagerPost(newMarker) {
    return this.postLocal(newMarker)

  }
}

export default new MarkerManager("markers")