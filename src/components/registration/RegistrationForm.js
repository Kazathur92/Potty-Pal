import React, { Component } from 'react'
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
    submitFormButton: false
  };


  handleFieldChange = evt => {
    const stateToChange = {};
    stateToChange[evt.target.id] = evt.target.value;
    this.setState(stateToChange);
  };

  registerNewUser = () => {
    let newName = this.state.formName
    let newLastName = this.state.formLastName
    let newUserName = this.state.formUserName
    let newEmail = this.state.formEmail
    let newPassword = this.state.formPassword
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
      sessionStorage.setItem(
        "credentials",
        JSON.stringify({
          email: this.state.formEmail,
          password: this.state.formPassword
        })
      )

      // sessionStorage.setItem("userID", this.props.users[i].id);
      // sessionStorage.setItem("username", this.props.users[i].userName)

      const newUser = {
        name: this.state.formName,
        lastName: this.state.formLastName,
        userName: this.state.formUserName,
        email: this.state.formEmail,
        password: this.state.formPassword,
        DOB: this.state.formDOB
      };


      console.log(newUser)

      this.props.registerStateChange()
      this.props.addUser(newUser).then(() => this.props.history.push("/home"))

    }
  }



  render() {


    return (
      <div id="registrationFormDiv" className="registrationFormDiv">
        <h1 className="registrationFormTitle">Registration Form</h1>
        <div id="registrationForm" className="registrationForm">
        <div className="fullNameDiv">
          <label className="formNameLabel">Name: </label>
          <input className="formNameInput" id="formName" type="text" className="nameInput" placeholder="Name" onChange={this.handleFieldChange}></input>
          <label className="formLastNameLabel">Last Name: </label>
          <input className="formLastNameInput" id="formLastName" type="text" className="nameInput" placeholder="Last Name" onChange={this.handleFieldChange}></input>
          </div>
          <div className="digialCredentialsDiv">
          <label className="formUserNameLabel">User Name: </label>
          <input className="formUserNameInput" id="formUserName" type="text" className="userNameInput" placeholder="User Name" onChange={this.handleFieldChange}></input>
          <label className="formEmailLabel">Email: </label>
          <input className="formEmailInput" id="formEmail" type="text" className="passInput" placeholder="password" onChange={this.handleFieldChange}></input>
          <label className="formPassLabel">Password: </label>
          <input className="formPassInput" id="formPassword" type="text" className="passInput" placeholder="password" onChange={this.handleFieldChange}></input>
          <label className="formConfPassLabel">Confirm Password: </label>
          <input className="formConfPassInput" id="formConfirmPassword" type="text" className="confirmPassInput" placeholder="confirm password" onChange={this.handleFieldChange}></input>
          </div>
          <div className="optionalFieldDiv">
          <label className="formDOBLabel">Date of Birth: </label>
          <input className="formDOBInput" id="formDOB" type="date" className="dobInput" onChange={this.handleFieldChange} ></input>
          </div>
        </div>
        <div className="registerBtnDiv">
        {/* <label className="formBtnTitleLabel">Register Now: </label> */}
        <button className="formBtnInput" id="submitFormButton" onClick={this.registerNewUser}>Register</button>
        </div>
      </div>
    )

  }

}