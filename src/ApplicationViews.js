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
          addressLocationButton={this.props.addressLocationButton}>
        </NavBar>

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
                //state props
                currentLocationButton={this.props.currentLocationButton}
                addressLocationButton={this.props.addressLocationButton}
                currentGeo={this.props.currentGeo}
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