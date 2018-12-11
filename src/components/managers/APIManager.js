import React, { Component } from 'react'

const LocalRemoteURL = "http://localhost:8088"
const GeolocationRemoteURL = "https://www.googleapis.com/geolocation/v1/geolocate?key=AIzaSyDOEBqiYykHzoCJyKAij9f2UwaF-DxtuBs"
const MapsRemoteURL = ""

export default class APIManager {

  constructor(route) {
    this.route = route
  }

  getLocal(id, route) {

    return fetch(`${LocalRemoteURL}/${this.route}/${id}`).then(e => e.json())
  }

  getMaps(id, route) {

    return fetch(`${MapsRemoteURL}/${this.route}/${id}`).then(e => e.json())
  }

  getGeolocation() {
    return fetch(`${GeolocationRemoteURL}`, { method: "POST", headers: {
      "Content-Type": "application/json"
    },
    body: ""}).then(data => data.json())
  }



  getAllLocal(route) {

    return fetch(`${LocalRemoteURL}/${this.route}`).then(e => e.json())
  }

  getAllMaps(route) {

    return fetch(`${MapsRemoteURL}/${this.route}`).then(e => e.json())
  }




  deleteLocal(id, route) {

    return fetch(`${LocalRemoteURL}/${this.route}`), { method: "DELETE" }
  }

  deleteMaps(id, route) {

    return fetch(`${MapsRemoteURL}/${this.route}`), { method: "DELETE" }
  }



  postLocal(newUser) {

    return fetch(`${LocalRemoteURL}/${this.route}/`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(newUser)
    })
  }


postMaps(id, route) {

  return fetch(`${MapsRemoteURL}/${this.route}`), { method: "POST" }

}



patchLocal(id, route) {

  return fetch(`${LocalRemoteURL}/${this.route}`), { method: "PATCH" }
}

patchMaps(id, route) {

  return fetch(`${MapsRemoteURL}/${this.route}`), { method: "PATCH" }
}

}