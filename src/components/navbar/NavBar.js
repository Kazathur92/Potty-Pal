import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import './NavBar.css'


export default class NavBar extends Component {


  state = {
    emailTextBox: "",
    passTextBox: ""
  }


  handleFieldChange = evt => {
    console.log(evt.target.value)
    const stateToChange = {};
    stateToChange[evt.target.id] = evt.target.value;
    this.setState(stateToChange);
  };

  loginUser = () => {
console.log("hi")
    sessionStorage.setItem(
      "credentials",
      JSON.stringify({
        email: this.state.emailTextBox,
        password: this.state.passTextBox
      })
    )

    this.props.userBarStateChange()
  }

  // hideLoggin = (evt) => {
  // // console.log(evt.target.parentNode.childNodes)
  // evt.target.parentNode.childNodes[0].classList.add("hidden")
  // evt.target.parentNode.childNodes[1].classList.add("hidden")
  // }

  // showNavBarButtons = (evt) => {
  //   // evt.preventDefault()
  //   console.log(evt.target.parentNode.parentNode.childNodes[3].childNodes)
  //   evt.target.parentNode.parentNode.childNodes[3].childNodes[0].classList.remove("hidden")
  //   evt.target.parentNode.parentNode.childNodes[3].childNodes[1].classList.remove("hidden")

  // }


  render() {

    let textboxTitlesField = ""
    let textboxesField = ""
    let navButtons = ""
    let userBar = ""

    if (this.props.interactionBar) {
      userBar = (
        <div>
          <div id="logOutButtonField" className="logOutButtonField">
            <button id="logOutButton" className="logOutButton" onClick={this.props.logOutButton}>Log Out</button>
          </div>
          <div className="userBar">
            <button type="submit" className="addButton noBorder" onClick={this.props.addNewMarker}>Add Bathroom</button>
            <button className="favoritesButton" onClick={this.handleFieldChange}>Favorites</button>
            <button className="trendingButton" onClick={this.handleFieldChange}>Trending</button>
          </div>
        </div>
      );
    } else {
      userBar = null
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
          <input id="passTextBox" className="passTextBox" type="text" placeholder="password" onChange={this.handleFieldChange}></input>
        </div>
      );
    } else {
      textboxesField = null
    }

    if (this.props.navButtons) {
      navButtons = (
        <div className="navRight">

        <button className="loginButton" id="loginButton" onClick={this.loginUser}>Log In</button>
        <Link className="navRegister" id="navRegister" to="/registration" onClick={this.props.navBarStateChange}>Register</Link>
      </div>
      );
    } else {
      navButtons = null
    }


    return (
      <div>
        <nav className="nav">
          <div className="navLeft">
            <Link className="homeLink" id="navHome" to="/home" onClick={this.props.homeStateChange}>Home</Link>
          </div>
          <div id="textboxesTitle" className="textboxesTitle">
            {textboxTitlesField}

          </div>
          <div id="textBoxes" className="textBoxes">

            {textboxesField}

          </div>
          {navButtons}

          {userBar}
        </nav>
        <header className="App-footer"></header>
      </div>
    )
  }

}

