import React, { Component } from 'react';
import { Map, InfoWindow, Marker, GoogleApiWrapper } from 'google-maps-react';
import ReactDOM from 'react-dom';
import NavBar from "./components/navbar/NavBar"
import ApplicationViews from "./ApplicationViews"
import MarkerManager from "./components/managers/MarkerManager"
import UserManager from "./components/managers/UserManager"
import GeolocationManager from "./components/managers/GeolocationManager"
import './App.css';
// import Geolocation from "./components/geolocation/Geolocation"
// import TEST from "./components/test/test";
// import Firebase from "./components/firebase/Firebase"

// import GeoFetch from "./components/geolocation/GeoFetch"




class App extends Component {

  state = {
    interactionBar: false,
    textboxTitles: true,
    textBoxes: true,
    navButtons: true,
    logOutButton: false,
    loginEmail: "",
    loginPassword: "",
    currentLocationButton: false,
    addressLocationButton: false,
    markers: [],
    currentGeo: {}
  }

  //loads all markers
  componentDidMount() {
    const newState = {}

    MarkerManager.MarkerManagerGetAll()
      .then(markers => newState.markers = markers)

    GeolocationManager.getCurrentGeolocation()
      .then(currentGeo => this.setState({currentGeo: currentGeo.location}))


  }

  //==================Navigation Bar===============================

  //session and local storage
  logOutButton = (evt) => {
    // console.log(evt.target.parentNode.parentNode.parentNode.childNodes[3])
    // evt.target.parentNode.parentNode.parentNode.childNodes[3].childNodes[0].classList.remove("hidden")
    // evt.target.parentNode.parentNode.parentNode.childNodes[3].childNodes[1].classList.remove("hidden")
    console.log(this.state.currentGeo)
    this.setState({
      interactionBar: !this.state.interactionBar,
      textboxTitles: !this.state.textboxTitles,
      textBoxes: !this.state.textBoxes,
      navButtons: !this.state.navButtons
      // loginButton: !this.state.loginButton,
      // navRegister: !this.state.navRegister
    })

    localStorage.removeItem(
      "credentials",
      JSON.stringify({
        email: this.state.emailTextBox,
        password: this.state.passTextBox
      })
    )


    sessionStorage.removeItem(
      "credentials",
      JSON.stringify({
        email: this.state.emailTextBox,
        password: this.state.passTextBox
      })
    )
  }
  //====================================================

  //=================More State Changes==============================================
  //changes the state of the user bar (add bathroom, favorites, trending, logout)
  userBarStateChange = () => {
    console.log("hi")

    this.setState({
      interactionBar: !this.state.interactionBar,
      loginButton: !this.state.loginButton,
      navRegister: !this.state.navRegister,
      textboxTitles: !this.state.textboxTitles,
      textBoxes: !this.state.textBoxes,
      navButtons: !this.state.navButtons
      // loginButton: !this.state.loginButton,
      // navRegister: !this.state.navRegister
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
      textboxTitles: !this.state.textboxTitles,
      textBoxes: !this.state.textBoxes,
      navButtons: !this.state.navButtons
    })
  }

  //changes state of nav bar once user hits the home link
  homeStateChange = () => {

    if (this.state.textboxTitles && this.state.textBoxes && this.state.navButtons === false) {
      this.setState({
        textboxTitles: !this.state.textboxTitles,
        textBoxes: !this.state.textBoxes,
        navButtons: !this.state.navButtons
      })
    }

    // if(this.state.textBoxes === false) {
    //   this.setState({
    //     textBoxes: !this.state.textBoxes,
    //   })
    // }

    // if(this.state.navButtons === false) {
    //   this.setState({
    //     navButtons: !this.state.navButtons
    //   })
    // }
    else {
      this.setState({
        interactionBar: false,
        textboxTitles: true,
        textBoxes: true,
        navButtons: true
      })
    }
  }

  //changes state of user bar once user hits register button in registration form
  registerStateChange = () => {

    this.setState({
      interactionBar: !this.state.interactionBar,
    })

  }
  //=============================================================


  //==========================C.R.U.D================================
  addUser = (newUser) => UserManager.UserManagerPost(newUser)


  //==================================================================

  render() {
    return (
      <div className="App">

        {/* <NavBar
          //state changing functions
          logOutButton={this.logOutButton}
          userBarStateChange={this.userBarStateChange}
          userBarMakeSelectionState={this.userBarMakeSelectionState}
          navBarStateChange={this.navBarStateChange}
          homeStateChange={this.homeStateChange}
          //state props
          interactionBar={this.state.interactionBar}
          textboxTitles={this.state.textboxTitles}
          textBoxes={this.state.textBoxes}
          navButtons={this.state.navButtons}
          currentLocationButton={this.currentLocationButton}
          addressLocationButton={this.addressLocationButton}>
          </NavBar> */}
        <ApplicationViews
          //state changing functions
          logOutButton={this.logOutButton}
          userBarStateChange={this.userBarStateChange}
          userBarMakeSelectionState={this.userBarMakeSelectionState}
          navBarStateChange={this.navBarStateChange}
          homeStateChange={this.homeStateChange}
          registerStateChange={this.registerStateChange}
          //C.R.U.D functions
          addUser={this.addUser}
          //state props
          interactionBar={this.state.interactionBar}
          textboxTitles={this.state.textboxTitles}
          textBoxes={this.state.textBoxes}
          navButtons={this.state.navButtons}
          currentLocationButton={this.state.currentLocationButton}
          addressLocationButton={this.state.addressLocationButton}
          currentGeo={this.state.currentGeo}>
        </ApplicationViews>

      </div>
    );
  }
}

export default App;
