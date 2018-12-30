export default class CurrentLocation extends Component {

getCurrentLocation() {

 return fetch(`https://www.googleapis.com/geolocation/v1/geolocate?key=AIzaSyDOEBqiYykHzoCJyKAij9f2UwaF-DxtuBs`).then(e => e.json())

}

}