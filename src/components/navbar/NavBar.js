import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import UserManager from "../managers/UserManager"
import './NavBar.css'


export default class NavBar extends Component {


  state = {
    emailTextBox: "",
    passTextBox: "",
  }


  handleFieldChange = evt => {
    console.log(evt.target.value)
    const stateToChange = {};
    stateToChange[evt.target.id] = evt.target.value;
    this.setState(stateToChange);
  };

  //   loginUser = () => {
  // console.log("hi")
  //     sessionStorage.setItem(
  //       "credentials",
  //       JSON.stringify({
  //         email: this.state.emailTextBox,
  //         password: this.state.passTextBox
  //       })
  //     )

  //     this.props.userBarStateChange()
  //   }


  userVerification_Step1 = () => {
    UserManager.checkUser(this.state.emailTextBox, this.state.passTextBox).then((response) => {
      if (response.length > 0) {
        sessionStorage.setItem("userID", response[0].id);
        sessionStorage.setItem("username", response[0].userName);
        this.props.userBarStateChange()
        this.props.userVerification_Step2()
      }
      else {
        alert("Your email or password does not match. Please try again.")
      }
    }
    )
  };



  render() {
    let homeLink = ""
    let textboxTitlesField = ""
    let textboxesField = ""
    let navButtons = ""

    if (this.props.homeLink) {
      homeLink = (
        <div className="navLeft">
          <Link className="homeLink" id="navHome" to="/home" onClick={this.props.homeStateChange}>Home</Link>
        </div>
      );
    } else {
      homeLink = null
    }

    if (this.props.textboxTitles) {
      textboxTitlesField = (
        <div id="textboxTitles2" className="textboxTitles2">
          <p className="textBoxEmailTitle">Email: </p>
          <p className="textBoxPassTitle">Password: </p>
        </div>
      );
    } else {
      textboxTitlesField = null
    }

    if (this.props.textBoxes) {
      textboxesField = (
        <div id="textboxes2" className="textboxes2">
          <input id="emailTextBox" className="emailTextBox" type="text" placeholder="email" onChange={this.handleFieldChange}></input>
          <input id="passTextBox" className="passTextBox" type="password" placeholder="password" onChange={this.handleFieldChange}></input>
        </div>
      );
    } else {
      textboxesField = null
    }

    if (this.props.navButtons) {
      navButtons = (
        <div className="navRight">

          <button className="loginButton" id="loginButton" onClick={this.userVerification_Step1}>Log In</button>
          <Link className="navRegister" id="navRegister" to="/registration" onClick={this.props.navBarStateChange}>Register</Link>
        </div>
      );
    } else {
      navButtons = null
    }


    return (
      <div>
        <nav className="nav">

          {homeLink}
          {/* <h1 className="appTitle">Potty Pal</h1> */}
          {/* <div className="navLeft">
            <Link className="homeLink" id="navHome" to="/home" onClick={this.props.homeStateChange}>Home</Link>
          </div> */}
          <div id="textboxesTitle" className="textboxesTitle">
            {textboxTitlesField}

          </div>
          <div id="textBoxes" className="textBoxes">

            {textboxesField}

          </div>
          {navButtons}
          {/* <h1 className="appTitle">Potty Pal</h1> */}
          {/* {userBar} */}
        </nav>
        <header className="App-footer">
        </header>
      </div>
    )
  }

}

