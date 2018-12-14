import React, { Component } from 'react'
import { Link } from 'react-router-dom'
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
  let testResult;
  for (let i = 0; i < this.props.users.length; i++) {
    console.log(this.props.users)
    if (this.props.users[i].email.indexOf(this.state.emailTextBox) > -1) {
      // now check password
      console.log(this.props.users[i])
      if (this.props.users[i].password === this.state.passTextBox) {
        // log in: store user ID (from matching object) in session storage
        sessionStorage.setItem("userID", this.props.users[i].id);
        sessionStorage.setItem("username", this.props.users[i].userName);
        testResult = "You are logged in!";
        this.props.userBarStateChange()
        this.props.userVerification_Step2()
        break;
      } else {
        testResult = "Your password does not match. Please try again.";
        break;
      }
    } else {
      testResult = "No username found. Please register a new account.";
    }
  }
  // tell the user the result of the test
  console.log(testResult);
};



  render() {
    let homeLink = ""
    let textboxTitlesField = ""
    let textboxesField = ""
    let navButtons = ""
    // let userBar = ""

    // if (this.props.interactionBar) {
    //   userBar = (
    //     <div>
    //       <div id="logOutButtonField" className="logOutButtonField">
    //         <button id="logOutButton" className="logOutButton" onClick={this.props.logOutButton}>Log Out</button>
    //       </div>
    //       <div className="userBar">
    //         <button type="submit" className="addButton noBorder" onClick={this.props.addNewMarker}>Add Bathroom</button>
    //         <button className="favoritesButton" onClick={this.handleFieldChange}>Favorites</button>
    //         <button className="trendingButton" onClick={this.handleFieldChange}>Trending</button>
    //       </div>
    //     </div>
    //   );
    // } else {
    //   userBar = null
    // }

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
          <h1 className="appTitle">Potty Pal</h1>
          {/* {userBar} */}
        </nav>
        <header className="App-footer">
        </header>
      </div>
    )
  }

}

