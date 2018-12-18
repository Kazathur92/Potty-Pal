import React, { Component } from 'react'
import { Route, Redirect } from 'react-router-dom'
import { Map, InfoWindow, Marker, GoogleApiWrapper } from 'google-maps-react';
import ReactDOM from 'react-dom';
import NavBar from "./components/navbar/NavBar"
import RegistrationForm from "./components/registration/RegistrationForm"
import MapContainer from "./components/mapContainer/MapContainer.js"
import './App.css';
// import SimpleMap from "./components/mapContainer/Container.js"
// import SideNav from "./components/sideNav/SideNav"



export default class ApplicationViews extends Component {

  consoleLog = () => {
    console.log(this.props.currentGeo)
  }

  render() {
    return (
      <div>
        <NavBar
          //state changing functions
          {...this.props}
          logOutButton={this.props.logOutButton}
          userBarStateChange={this.props.userBarStateChange}
          userBarMakeSelectionState={this.props.userBarMakeSelectionState}
          navBarStateChange={this.props.navBarStateChange}
          homeStateChange={this.props.homeStateChange}
          //state props
          interactionBar={this.props.interactionBar}
          textboxTitles={this.props.textboxTitles}
          textBoxes={this.props.textBoxes}
          navButtons={this.props.navButtons}
          currentLocationButton={this.props.currentLocationButton}
          addressLocationButton={this.props.addressLocationButton}
          homeLink={this.props.homeLink}
          interactionBar={this.props.interactionBar}
          registrationButton={this.props.registrationButton}
          //Data
          users={this.props.users}
          currentGeo={this.props.currentGeo}
        //authentication
        // userVerification_Step2={this.props.userVerification_Step2}
        >
        </NavBar>
        {/* <button onClick={this.consoleLog}>console log current location</button> */}
        <React.Fragment>

          <Route path="/" render={(props) => {
            return <Redirect to="/home" />
          }}
          />


          <Route path="/home" render={(props) => {

            return <React.Fragment>
              <MapContainer
                //state change functions
                userBarMakeSelectionState={this.props.userBarMakeSelectionState}
                logOutButton={this.props.logOutButton}
                //C.R.U.D
                addMarker={this.props.addMarker}
                deleteMarker={this.props.deleteMarker}
                editMarker={this.props.editMarker}
                //state props
                localStorage={this.props.localStorage}
                sessionStorage={this.props.sessionStorage}
                currentLocationButton={this.props.currentLocationButton}
                addressLocationButton={this.props.addressLocationButton}
                interactionBar={this.props.inretactionBar}
                homeLink={this.props.homeLink}
                registerButton={this.props.registerButton}
                //Data
                currentGeo={this.props.currentGeo}
                markers={this.props.markers}
                users={this.props.users}
                bathrooms={this.props.bathrooms}
                //authentication
                isAuthenticated={this.props.isAuthenticated}

              />

            </React.Fragment>
          }}
          />

          <Route path="/registration" render={(props) => {
            return <RegistrationForm {...props}
              //state change functions
              logOutButton={this.props.logOutButton}
              userBarStateChange={this.props.userBarStateChange}
              registerStateChange={this.props.registerStateChange}
              //C.R.U.D functions
              addUser={this.props.addUser}
              //state props
              homeLink={this.props.homeLink}
              interactionBar={this.props.interactionBar}
              registerButton={this.props.registerButton}
              //Data
              users={this.props.users}
            />
          }}
          />
        </React.Fragment>

      </div>
    )

  }

}














//================Original Render =======================
//   render() {

//     return (
//       <React.Fragment>
//         <Route path="/" render={(props) => {
//           return <Redirect to="/home" />
//         }}
//         />

//         <Route path="/home" render={(props) => {
//           return <React.Fragment>
//             <MapContainer
//               //state change functions
//               userBarMakeSelectionState={this.props.userBarMakeSelectionState}
//               //state props
//               currentLocationButton={this.currentLocationButton}
//               addressLocationButton={this.addressLocationButton}
//             />

//           </React.Fragment>
//         }}
//         />

//         <Route path="/registration" render={(props) => {
//           return <RegistrationForm {...props}
//             //state change functions
//             logOutButton={this.props.logOutButton}
//             userBarStateChange={this.props.userBarStateChange}
//             registerStateChange={this.props.registerStateChange}
//             //C.R.U.D functions
//             addUser={this.props.addUser}
//           //state props
//           />
//         }}
//         />
//       </React.Fragment>


//     )

//   }


// }