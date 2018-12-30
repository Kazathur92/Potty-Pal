import APIManager from "./APIManager"

class GeolocationManager extends APIManager {

getCurrentGeolocation() {
  return this.getGeolocation()


}

  MarkerManagerPost(newMarker) {
    return this.postLocal(newMarker)

  }
}

export default new GeolocationManager()