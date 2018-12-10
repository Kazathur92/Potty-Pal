import React, { Component } from 'react'
import { Route, Redirect } from 'react-router-dom'
import RegistrationForm from "./components/registration/RegistrationForm"
import AppManager from "./components/managers/AppManager"
import MapContainer from "./components/mapContainer/Container.js"
import SimpleMap from "./components/mapContainer/Container.js"
// import SideNav from "./components/sideNav/SideNav"

export default class Routes extends Component {

  addUser = (newUser) => AppManager.AppManagerPost(newUser)


  render() {

    return (
      <React.Fragment>
        <Route path="/" render={(props) => {
          return <Redirect to="/home" />
        }}
        />

        <Route path="/home" render={(props) => {
          return <MapContainer />
          // return <SimpleMap />
        }}
        />

        <Route path="/registration" render={(props) => {
          return <RegistrationForm {...props}
            logOutButton={this.props.logOutButton}
            userBarStateChange={this.props.userBarStateChange}
            addUser={this.addUser}
            registerStateChange={this.props.registerStateChange}
          />
        }}
        />
      </React.Fragment>


    )

  }


}