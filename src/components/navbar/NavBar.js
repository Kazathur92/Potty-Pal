import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import { Button, Modal } from "react-bulma-components/full";
import { rotateIn, fadeIn } from 'react-animations'
import Radium, { StyleRoot } from 'radium';
import UserManager from "../managers/UserManager"
import './NavBar.css'


const rotateInAnimation = {
  rotateIn: {
    animation: "2s",
    animationName: Radium.keyframes(rotateIn, "rotateIn")
  }
}

const fadeInAnimation = {
  fadeIn: {
    animation: "1s",
    animationName: Radium.keyframes(fadeIn, "fadeIn")
  }
}


export default class NavBar extends Component {


  state = {
    emailTextBox: "",
    passTextBox: "",
    //RegistrationForm Values states
    formName: "",
    formLastName: "",
    formUserName: "",
    formEmail: "",
    formPass: "",
    // formConfirmPass: "",
    formDOB: "",
    submitFormButton: false
  }

  handleFieldChange = evt => {
    console.log(evt.target.value)
    const stateToChange = {};
    stateToChange[evt.target.id] = evt.target.value;
    this.setState(stateToChange);
  };



  //===================================USER REGISTRATION=============================
  consoleLog = () => {
    console.log(this.state.formEmail)
    console.log(this.state.formPass)
  }


  registerNewUser = () => {
    console.log(this.state.formName)
    console.log(this.state.formLastName)
    console.log(this.state.formUserName)
    console.log(this.state.formEmail)
    console.log(this.state.formPass)
    console.log(this.state.formDOB)
    let newName = this.state.formName
    let newLastName = this.state.formLastName
    let newUserName = this.state.formUserName
    let newEmail = this.state.formEmail
    let newPassword = this.state.formPass
    let newDOB = this.state.formDOB
    console.log(newName)
    console.log(newLastName)
    console.log(newUserName)
    console.log(newEmail)
    console.log(newPassword)
    console.log(newDOB)

    if (newName === "" || newLastName === "" || newUserName === "" || newEmail === "" || newPassword === "" || newDOB === "") {
      alert("All fields must be filled out")
    } else {

      // sessionStorage.setItem(
      //   "credentials",
      //   JSON.stringify({
      //     email: this.state.formEmail,
      //     password: this.state.formPass
      //   })
      // )

      // sessionStorage.setItem("userID", this.props.users[i].id);
      // sessionStorage.setItem("username", this.props.users[i].userName)

      const newUser = {
        name: this.state.formName,
        lastName: this.state.formLastName,
        userName: this.state.formUserName,
        email: this.state.formEmail,
        password: this.state.formPass,
        DOB: this.state.formDOB
      };


      console.log(newUser)

      this.props.registerStateChange()
      this.props.addUser(newUser)
        .then(() => UserManager.checkUser(this.state.formEmail, this.state.formPass).then((response) => {
          if (response.length > 0) {
            console.log(response)
            sessionStorage.setItem("userID", response[0].id);
            sessionStorage.setItem("username", response[0].userName);
            this.props.userBarStateChange()
          }
        }
        )
        )


    }
  }

  //==================================USER REGISTRATION END==========================



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
    // let homeLink = ""
    let textboxTitlesField = ""
    let textboxesField = ""
    let navButtons = ""
    let emptyUserBar = ""
    let registrationForm = ""

    //not in use
    // if (this.props.homeLink) {
    //   homeLink = (
    //     <div className="navLeft">
    //       <Link className="homeLink" id="navHome" to="/home" onClick={this.props.homeStateChange}>Home</Link>
    //     </div>
    //   );
    // } else {
    //   homeLink = null
    // }

    if (this.props.textboxTitles) {
      textboxTitlesField = (
        <StyleRoot>
          <div id="textboxTitles2" className="textboxTitles2" style={fadeInAnimation.fadeIn}>
            <p className="textBoxEmailTitle">Email: </p>
            <p className="textBoxPassTitle">Password: </p>
          </div>
        </StyleRoot>
      );
    } else {
      textboxTitlesField = null
    }

    if (this.props.textBoxes) {
      textboxesField = (
        <StyleRoot>
          <div id="textboxes2" className="textboxes2" style={fadeInAnimation.fadeIn}>
            <input id="emailTextBox" className="emailTextBox" type="text" placeholder="email" onChange={this.handleFieldChange}></input>
            <input id="passTextBox" className="passTextBox" type="password" placeholder="password" onChange={this.handleFieldChange}></input>
          </div>
        </StyleRoot>
      );
    } else {
      textboxesField = null
    }

    if (this.props.navButtons) {
      navButtons = (
        <StyleRoot>
          <div className="navRight" style={fadeInAnimation.fadeIn}>

            <Button className="loginButton is-normal is-rounded" id="loginButton" onClick={this.userVerification_Step1}>Log In</Button>
            <Button className="navRegister is-normal is-rounded" id="navRegister" onClick={this.props.navBarStateChange}>Register</Button>
          </div>
        </StyleRoot>
      );
    } else {
      navButtons = null
    }

    if (this.props.sessionStorage === false) {
      emptyUserBar = (
        <div className="fakeUserBar"></div>
      )
    }
    else {
      emptyUserBar = null
    }

    let Title = (
      <StyleRoot>
        <h1 className="appTitle" style={rotateInAnimation.rotateIn}>Potty Pal</h1>
      </StyleRoot>
    )

    if (this.props.registerButton) {
      registrationForm = (
        <Modal show={this.props.show} onClose={this.props.close} {...this.props.modal} closeOnBlur={true}>
          <div id="registrationForm" className="registrationForm modal-content">
            <h1 className="formTitle">Registragion Form</h1>
            <table>
              <thead>
                <tr>
                  {/* <th>User Info</th> */}
                </tr>
              </thead>
              <tbody>
                <tr className="formContent">
                  <td className="formName">Name: </td>
                  <td><input id="formName" placeholder="Name" onChange={this.handleFieldChange}></input></td>
                  <td className="formLastName">Last name: </td>
                  <td><input id="formLastName" placeholder="Last Name" onChange={this.handleFieldChange}></input></td>
                  <td className="formUserName">Name: </td>
                  <td><input id="formUserName" placeholder="User Name" onChange={this.handleFieldChange}></input></td>
                  <td className="formEmail">Email: </td>
                  <td><input id="formEmail" placeholder="Email" onChange={this.handleFieldChange}></input></td>
                  <td className="formPass">Name: </td>
                  <td><input id="formPass" placeholder="Password" onChange={this.handleFieldChange}></input></td>
                  <td className="formConfirmPass">Name: </td>
                  <td><input id="formConfirmPass" placeholder="Confirm Password" onChange={this.handleFieldChange}></input></td>
                  <td className="formDOB">Name: </td>
                  <td><input id="formDOB" type="date" onChange={this.handleFieldChange}></input></td>
                </tr>
              </tbody>
            </table>
            <button className="formBtnInput" id="submitFormButton" onClick={this.registerNewUser}>Register</button>
          </div>
        </Modal>
      )
    } else {
      registrationForm = null
    }


    return (
      <div>
        <nav className="nav">
          {/* {homeLink} */}
          {Title}
          <audio autoPlay>
  {/* <source src="horse.ogg" type="audio/ogg"></source> */}
  <source src="https://www.youtube.com/watch?v=yZwKkpcXSws" type="audio/mpeg"/>
</audio>
          {/* <button onClick={this.consoleLog}>console Log</button> */}
          <div id="textboxesTitle" className="textboxesTitle">
            {textboxTitlesField}
          </div>
          <div id="textBoxes" className="textBoxes">
            {textboxesField}
          </div>
          {navButtons}
        </nav>
        {emptyUserBar}
        {registrationForm}
      </div>
    )
  }

}

