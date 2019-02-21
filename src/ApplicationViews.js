import React, { Component } from 'react'
// import Container from "./components/mapContainer/Container.js"
import { Route } from 'react-router-dom'
import NavBar from "./components/navbar/NavBar"
// import RegistrationForm from "./components/registration/RegistrationForm"
import MapContainer from "./components/mapContainer/MapContainer.js"
import { Button, Modal, Icon } from "react-bulma-components/full";
import './App.css';



export default class ApplicationViews extends Component {

  consoleLog = () => {
    console.log(this.props.currentGeo)
  }

  render() {
    return (
      <div>
      {/* <Container /> */}
        <NavBar
          //state changing functions
          {...this.props}
          logOutButton={this.props.logOutButton}
          userBarStateChange={this.props.userBarStateChange}
          userBarMakeSelectionState={this.props.userBarMakeSelectionState}
          navBarStateChange={this.props.navBarStateChange}
          homeStateChange={this.props.homeStateChange}
          close={this.props.close}
          registerStateChange={this.props.registerStateChange}

          //C.R.U.D functions
          addUser={this.props.addUser}
          //state props
          interactionBar={this.props.interactionBar}
          textboxTitles={this.props.textboxTitles}
          textBoxes={this.props.textBoxes}
          navButtons={this.props.navButtons}
          currentLocationButton={this.props.currentLocationButton}
          addressLocationButton={this.props.addressLocationButton}
          homeLink={this.props.homeLink}
          registerButton={this.props.registerButton}
          show={this.props.show}
          //Data
          users={this.props.users}
          currentGeo={this.props.currentGeo}
        // authentication
        sessionStorage={this.props.sessionStorage}
        userVerification_Step2={this.props.userVerification_Step2}
        >
        </NavBar>
        {/* <button onClick={this.consoleLog}>console log current location</button> */}

      {/* <Button onClick={this.props.setingUserMarkers}>setting Markeds</Button> */}

          <Route path="/" render={(props) => {

            return <React.Fragment>
               <MapContainer
                //state change functions
                userBarMakeSelectionState={this.props.userBarMakeSelectionState}
                logOutButton={this.props.logOutButton}
                setingUserMarkers={this.props.setingUserMarkers}
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
                userMarkers={this.props.userMarkers}
                //authentication
                isAuthenticated={this.props.isAuthenticated}

              />


            </React.Fragment>
          }}
          />
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