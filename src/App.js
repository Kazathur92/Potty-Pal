import React, { Component } from 'react';
// import { google } from 'google-maps-react';
import NavBar from "./components/navbar/NavBar"
import TEST from "./components/test/test";
// import Firebase from "./components/firebase/Firebase"
import Routes from "./Routes"
import './App.css';
// import Firebase from './components/firebase/Firebase';


class App extends Component {

  state = {
    interactionBar: false,
    textboxTitles: true,
    textBoxes: true,
    navButtons: true,
    logOutButton: false,
    loginEmail: "",
    loginPassword: ""

  }


  logOutButton = (evt) => {
    console.log(evt.target.parentNode.parentNode.parentNode.childNodes[3])
    // evt.target.parentNode.parentNode.parentNode.childNodes[3].childNodes[0].classList.remove("hidden")
    // evt.target.parentNode.parentNode.parentNode.childNodes[3].childNodes[1].classList.remove("hidden")
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

  navBarStateChange = () => {
    console.log("hi")

    this.setState({
      textboxTitles: !this.state.textboxTitles,
      textBoxes: !this.state.textBoxes,
      navButtons: !this.state.navButtons
    })
  }

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

  registerStateChange = () => {

    this.setState({
      interactionBar: !this.state.interactionBar,
    })

  }

  // TEST()

  render() {
    return (
      <div className="App">
        {/* <TEST /> */}
        <NavBar
          logOutButton={this.logOutButton}
          userBarStateChange={this.userBarStateChange}
          navBarStateChange={this.navBarStateChange}
          homeStateChange={this.homeStateChange}
          interactionBar={this.state.interactionBar}
          textboxTitles={this.state.textboxTitles}
          textBoxes={this.state.textBoxes}
          navButtons={this.state.navButtons}
        ></NavBar>
        <Routes
          logOutButton={this.logOutButton}
          userBarStateChange={this.userBarStateChange}
          navBarStateChange={this.navBarStateChange}
          homeStateChange={this.homeStateChange}
          registerStateChange={this.registerStateChange}
          interactionBar={this.state.interactionBar}
          textboxTitles={this.state.textboxTitles}
          textBoxes={this.state.textBoxes}
          navButtons={this.state.navButtons}>
        </Routes>
      </div>
    );
  }
}

export default App;
