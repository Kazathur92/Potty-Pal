import React, { Component } from 'react'
import { Route, Redirect } from 'react-router-dom'
import './Registration.css'

export default class RegistrationForm extends Component {

  state = {
    formName: "",
    formLastName: "",
    formUserName: "",
    formEmail: "",
    formPassword: "",
    formConfirmPassword: "",
    formDOB: "",
    submitFormButton: false,
    // interactionBar: false
  };


  handleFieldChange = evt => {
    const stateToChange = {};
    stateToChange[evt.target.id] = evt.target.value;
    this.setState(stateToChange);
  };

  registerNewUser = (evt) => {
    // console.log(evt.target.parentNode.parentNode.childNodes[0].childNodes[0])

    localStorage.setItem(
      "credentials",
      JSON.stringify({
        email: this.state.formEmail,
        password: this.state.formPassword
      })
    )

    const newUser = {
      name: this.state.formName,
      lastName: this.state.formLastName,
      userName: this.state.formUserName,
      email: this.state.formEmail,
      password: this.state.formPassword,
      DOB: this.state.formDOB
    };


    console.log(newUser)
    // evt.target.parentNode.parentNode.childNodes[0].childNodes[0].childNodes[3].childNodes[0]
    // evt.target.parentNode.parentNode.childNodes[0].childNodes[0].childNodes[3].childNodes[1].classList.remove("hidden")
    this.props.registerStateChange()
    this.props.addUser(newUser).then(() => this.props.history.push("/home"))


  }



  render() {


    return (
<div id="registrationFormDiv" className="registrationFormDiv">

      <div id="registrationForm" className="registrationForm">
      <h3>Name: </h3>
      <input id="formName" type="text" className="nameInput" placeholder="Name" onChange={this.handleFieldChange}></input>
      <h3>Last Name: </h3>
      <input id="formLastName" type="text" className="nameInput" placeholder="Last Name" onChange={this.handleFieldChange}></input>
      <h3>User Name: </h3>
      <input id="formUserName" type="text" className="userNameInput" placeholder="User Name" onChange={this.handleFieldChange}></input>
      <h3>Email: </h3>
      <input id="formEmail" type="text" className="passInput" placeholder="password" onChange={this.handleFieldChange}></input>
      <h3>Password: </h3>
      <input id="formPassword" type="text" className="passInput" placeholder="password" onChange={this.handleFieldChange}></input>
      <h3>Confirm Password: </h3>
      <input id="formConfirmPassword" type="text" className="confirmPassInput" placeholder="confirm password" onChange={this.handleFieldChange}></input>
      <h3>Date of Birth: </h3>
      <input id="formDOB" type="date" className="dobInput" onChange={this.handleFieldChange} ></input>
      </div>
      <h3>Register Now: </h3>

      <button id="submitFormButton" onClick={this.registerNewUser}>Register</button>


</div>
)

  }

}