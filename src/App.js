import React, { Component } from 'react';
import ApplicationViews from "./ApplicationViews"
import MarkerManager from "./components/managers/MarkerManager";
import UserManager from "./components/managers/UserManager";
import GeolocationManager from "./components/managers/GeolocationManager";
import BathroomManager from './components/managers/BathroomManager';
import './App.css';
// import TEST from "./components/test/test";
// import Firebase from "./components/firebase/Firebase"
// import GeoFetch from "./components/geolocation/GeoFetch"




class App extends Component {

  state = {
    //Authentication states
    localStorage: false,
    sessionStorage: false,
    //RegistrationForm Modal state
    show: false,
    //NavBar states
    textboxTitles: true,
    textBoxes: true,
    navButtons: true,
    logOutButton: false,
    homeLink: false,
    registerButton: false,
   //NavBar values states
    loginEmail: "",
    loginPassword: "",
    currentLocationButton: false,
    addressLocationButton: false,
    //data
    users: [],
    markers: [],
    bathrooms: [],
    currentGeo: {},
    //Geocode npm
    userLocation: { lat: 40.6627, lng: -86.7816 }, //without the currentGeo
    loading: true,
  }

  //36.1627},%20${-86.7{()=> 816

  close = () => this.setState({
    show: false
     });


  getDataTest = () => {


    // return fetch("https://maps.googleapis.com/maps/api/place/textsearch/json?query=restrooms&location=36.1627,%20-86.7816&radius=10000", {
    return fetch("https://maps.googleapis.com/maps/api/place/textsearch/json?query=public+bathroom&location=36.1627,%20-86.7816&radius=10000&expand:place_id&key=AIzaSyDOEBqiYykHzoCJyKAij9f2UwaF-DxtuBs", {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        key: "AIzaSyDt5XcKR4N-Gm0W525I90N-xunjpzPZhNA"

      }
    })
      // return fetch("https://maps.googleapis.com/maps/api/place/findplacefromtext/json?input=public+bathroom&inputtype=textquery&fields=photos,formatted_address,geometry&locationbias=circle:10000@36.1627,%20-86.7816&key=AIzaSyDOEBqiYykHzoCJyKAij9f2UwaF-DxtuBs")
      //   // .then(e => console.log(e.json()))
      .then(e => e.json())
      .then(e => this.setState({ bathrooms: e.results }))
    // .then((e) => console.log("data here", e))
  }


  //loads all markers
  componentDidMount() {



    //This renders the user bar if the user has not logged out, but just refreshed
    this.ifSessionStorageFound()

    //gets CURRENT GEO
    GeolocationManager.getCurrentGeolocation()
      .then(currentGeo => this.setState({ currentGeo: currentGeo.location }))
    //gets USERS
    UserManager.UserManagerGetAll()
      .then(users => this.setState({ users: users }))
    //gets MARKERS
    MarkerManager.MarkerManagerGetAll()
      .then(markers => this.setState({ markers: markers }))


    navigator.geolocation.getCurrentPosition(
      position => {
        const { latitude, longitude } = position.coords;

        BathroomManager.BathroomManagerGetAll(`&location=${latitude},%20${longitude}&radius=10000`)
          .then(allBathrooms => this.setState({ bathrooms: allBathrooms.results }))

        this.setState({
          userLocation: { lat: latitude, lng: longitude },
          loading: false
        });
      },
      () => {
        this.setState({ loading: false })
      }
    )

  }

  // ============================AUTHENTICATION===========================

  ifSessionStorageFound = () => {
    if (sessionStorage.getItem("userID") !== null) {

      this.setState({
        localStorage: !this.state.localStorage,
        sessionStorage: !this.state.sessionStorage,
        textboxTitles: !this.state.textboxTitles,
        textBoxes: !this.state.textBoxes,
        navButtons: !this.state.navButtons,
      })
    }
  }



  userVerification_Step2 = () => {

    console.log("before verification", this.state.sessionStorage)

    this.setState({
      localStorage: !this.state.localStorage,
      sessionStorage: !this.state.sessionStorage,

    })

    console.log("after verification", this.state.sessionStorage)
  };

  //=====================================================================

  //==================Navigation Bar===============================

  //session and local storage
  logOutButton = () => {
    console.log(this.state.bathrooms)
    this.setState({
      localStorage: !this.state.localStorage,
      sessionStorage: !this.state.sessionStorage,
      textboxTitles: !this.state.textboxTitles,
      textBoxes: !this.state.textBoxes,
      navButtons: !this.state.navButtons,
      // registerButton: false
    })
    console.log(this.state.currentGeo)
    localStorage.clear()
    sessionStorage.clear()
  }
  //====================================================

  //=================More State Changes==============================================
  //changes the state of the user bar (add bathroom, favorites, trending, logout)
  userBarStateChange = () => {
    console.log("hi")

    this.setState({
      textboxTitles: !this.state.textboxTitles,
      textBoxes: !this.state.textBoxes,
      navButtons: !this.state.navButtons,
    })
  }

  //changes the state of the userbar's selection bar(use current location, use address)
  userBarMakeSelectionState = () => {

    this.setState({
      currentLocationButton: false,
      addressLocationButton: false,
    })

  }

  //changes the state of the nav bar (login, register, and textboxes)
  navBarStateChange = () => {
    console.log("hi")

    this.setState({
      // textboxTitles: !this.state.textboxTitles,
      // textBoxes: !this.state.textBoxes,
      // navButtons: !this.state.navButtons,
      homeLink: true,
      registerButton: true,
      show: true
    })
  }

  //changes state of nav bar once user hits the home link
  homeStateChange = () => {

    if (this.state.textboxTitles && this.state.textBoxes && this.state.navButtons === false) {
      this.setState({
        textboxTitles: true,
        textBoxes: true,
        navButtons: true
      })
    }

    else {
      this.setState({
        interactionBar: false,
        textboxTitles: true,
        textBoxes: true,
        navButtons: true,
        homeLink: false
      })
    }
  }

  //changes state of user bar once user hits register button in registration form
  registerStateChange = () => {

    this.setState({
      sessionStorage: true,
      interactionBar: true,
      homeLink: false,
      registerButton: false
    })

  }
  //=============================================================


  //==========================C.R.U.D================================
  addUser = (newUser) => UserManager.UserManagerPost(newUser)

  addMarker = (newMarker) => {
    MarkerManager.MarkerManagerPostAndList(newMarker)
      .then(allMarkers => this.setState({ markers: allMarkers })).catch(function () {
        alert("error")
      })
  }

  deleteMarker = (id) => {
    console.log("hi")
    MarkerManager.MarkerManagerDeleteAndList(id)
      .then(allMarkers => this.setState({ markers: allMarkers }))
  }

  editMarker = (editedMarker, id) => {
    console.log(editedMarker, id)
    MarkerManager.MarkerManagerPatchAndList(editedMarker, id)
      .then(allMarkers => this.setState({ markers: allMarkers }))
  }


  consoleLog = () => {
    console.log(this.state.userLocation)
  }


  //==================================================================

  render() {
    const { loading, userLocation } = this.state

    return (
      <div className="App">

        {/* consoleLog */}
        {/* <button onClick={this.consoleLog}>Console Log</button> */}
        {/* <button onClick={() => this.getDataTest()}>Test</button> */}
        <ApplicationViews
          //state changing functions
          logOutButton={this.logOutButton}
          userBarStateChange={this.userBarStateChange}
          userBarMakeSelectionState={this.userBarMakeSelectionState}
          navBarStateChange={this.navBarStateChange}
          homeStateChange={this.homeStateChange}
          registerStateChange={this.registerStateChange}
          close={this.close}
          //C.R.U.D functions
          addUser={this.addUser}
          addMarker={this.addMarker}
          deleteMarker={this.deleteMarker}
          editMarker={this.editMarker}
          //state props
          localStorage={this.state.localStorage}
          sessionStorage={this.state.sessionStorage}
          registerButton={this.state.registerButton}
          textboxTitles={this.state.textboxTitles}
          textBoxes={this.state.textBoxes}
          navButtons={this.state.navButtons}
          currentLocationButton={this.state.currentLocationButton}
          addressLocationButton={this.state.addressLocationButton}
          homeLink={this.state.homeLink}
          show={this.state.show}
          //Data
          currentGeo={this.state.currentGeo}
          markers={this.state.markers}
          users={this.state.users}
          bathrooms={this.state.bathrooms}
          userLocaion={userLocation}
          //authentication
          isAuthenticated={this.isAuthenticated}
          userVerification_Step2={this.userVerification_Step2}
        >

        </ApplicationViews>
      </div>
    );
  }
}

export default App;
