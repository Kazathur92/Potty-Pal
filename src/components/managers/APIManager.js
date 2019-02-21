// const LocalRemoteURL = "http://localhost:8088"
const LocalRemoteURL = "https://potty-pal-json.herokuapp.com"
const GeolocationRemoteURL = "https://www.googleapis.com/geolocation/v1/geolocate?key=AIzaSyDOEBqiYykHzoCJyKAij9f2UwaF-DxtuBs"
// const MapsRemoteURL = `https://maps.googleapis.com/maps/api/place/textsearch/json?query=restrooms&location=${36.1627},%20${-86.7816}&radius=10000&key=AIzaSyDOEBqiYykHzoCJyKAij9f2UwaF-DxtuBs`
// const MapsRemoteURL = "https://maps.googleapis.com/maps/api/place/textsearch/json?query=restrooms" //worked on postman
// const MapsRemoteURL = "https://maps.googleapis.com/maps/api/place/textsearch/json?query=public+bathroom"

export default class APIManager {

  constructor(route) {
    this.route = route
  }

  getLocal(id, route) {

    return fetch(`${LocalRemoteURL}/${this.route}/${id}`).then(e => e.json())
  }

  getGeolocation() {
    return fetch(`${GeolocationRemoteURL}`, {
      method: "POST", headers: {
        "Content-Type": "application/json"
      },
      body: ""
    }).then(data => data.json())
  }

  getAllLocal(route) {

    return fetch(`${LocalRemoteURL}/${this.route}`).then(e => e.json())
  }


  //this has been altered, see APIManagerOg for original one which worked with
  getAllMaps(query) {
    // console.log(`https://potty-pal-proxy.herokuapp.com/api/maps?${query}`)
    return fetch(`https://potty-pal-proxy.herokuapp.com/api/maps?${query}`).then(e => e.json())
    // .then(function(result){
    //   console.log(result)
    //   return result.json()
    // })
    // .then(e => e.json())
  }

  deleteLocal(id, route) {

    return fetch(`${LocalRemoteURL}/${this.route}/${id}`, { method: "DELETE" }).catch(function() {
      alert("error")
  })
    // .then(e => e.json())
    // .then(() => fetch(`${LocalRemoteURL}/${this.route}`))
    // .then(e => e.json())

  }

  postLocal(newItem) {

    return fetch(`${LocalRemoteURL}/${this.route}/`, {
      method: "POST",
      // sensor: true,
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(newItem)
    })
  }

  patchLocal(editedMarker, id, route) {

    return fetch(`${LocalRemoteURL}/${this.route}/${id}`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(editedMarker)
    })
  }

}