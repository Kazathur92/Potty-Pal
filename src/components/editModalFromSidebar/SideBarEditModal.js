import React, { Component } from 'react'
import { Button, Modal, Icon } from "react-bulma-components/full";
import StarRatingComponent from 'react-star-rating-component';
import { slideInDown, flipInX, headShake, fadeIn, fadeOut, flipInY } from 'react-animations'
import Radium, { StyleRoot } from 'radium';
import './SideBarEditModal.css'

//=============================ANIMATIONS==============================
const slideDownAnimation = {
  slideInDown: {
    animation: "1s",
    animationName: Radium.keyframes(slideInDown, "sildeInDown")
  }
}

const fadeInAnimation = {
  fadeIn: {
    animation: "1s",
    animationName: Radium.keyframes(fadeIn, "fadeIn")
  }
}

const fadeOutAnimation = {
  fadeOut: {
    animation: "1s",
    animationName: Radium.keyframes(fadeOut, "fadeOut")
  }
}

const flipInAnimation = {
  flipInX: {
    animation: "1s",
    animationName: Radium.keyframes(flipInX, "flipInX")
  }
}

const headShakeAnimation = {
  headShake: {
    animation: "3s",
    animationName: Radium.keyframes(headShake, "headShake")
  }
}

const flipInYAnimation = {
  flipInY: {
    animation: "1s",
    animationName: Radium.keyframes(flipInY, "flipInY")
  }
}
//=========================================================================


export default class SideBarEditModal extends Component {


  state = {
    // show: false,
    editBabyStationCheck: this.props.editBabyStationCheck,
    editHandicapAccessCheck: this.props.editHandicapAccessCheck,
    rating: 0,
  }


  // inheritCheckboxesState = () => {
  // if(this.props.editBabyStationCheck.checked) {

  // this.setState({
  //   editBabyStationCheck: true
  // })
  // this.inheritCheckboxesStateStep2()
  // }
  // else {
  //   this.setState({
  //     editBabyStationCheck: false
  //   })
  //   this.inheritCheckboxesStateStep2()
  // }
  // }

  // inheritCheckboxesStateStep2 = () => {
  //   if (this.editHandiStationCheck.checked) {
  //     this.setState({
  //       editHandiStationCheck: true
  //     })
  //   }
  //   else {
  //     this.setState({
  //       editHandiStationCheck: false
  //     })
  //   }
  // }
  onStarClick(nextValue, prevValue, name) {
    this.setState({ rating: nextValue });
  }

  sidebarCheckStatesLog = () => {
    console.log("this.state.editBabyStacionCheck", this.state.editBabyStationCheck)
    console.log("this.state.editHandicapAccessCheck", this.state.editHandicapAccessCheck)
    console.log("props editedName", this.props.editedName)
    console.log("props editedLocationName", this.props.editedLocationName)
  }



  render() {

let babyCheckboxStatus = ""
let handiCheckboxStatus = ""



let changingStationLabel = ""
let handicapAccessLabel = ""

if (this.props.currentMarker.changingStation) {


  changingStationLabel = "Available"

} else {


  changingStationLabel = "Unavailable"
}

if (this.props.currentMarker.handicapAccess) {

  handicapAccessLabel = "Available"

} else {

  handicapAccessLabel = "Unavailable"
}


if (this.props.babyCheckCondition) {
  babyCheckboxStatus = (
    <p className="mockMarkerBabyCheck"><Icon className="fas fa-baby" color="info"></Icon>
      &nbsp;{changingStationLabel}</p>
  )
} else {
  babyCheckboxStatus = (
    <p className="mockMarkerBabyCheck"><Icon className="fas fa-baby" color="info"></Icon>
      &nbsp;{this.props.babyCheckStatus}</p>
  )
}

//#2
if (this.props.handiCheckCondition) {
  handiCheckboxStatus = (

    <p className="mockMarkerHandiCheck"><Icon className="fas fa-wheelchair" color="info"></Icon>
      &nbsp;{handicapAccessLabel}</p>
  )
} else {
  handiCheckboxStatus = (

    <p className="mockMarkerHandiCheck"><Icon className="fas fa-wheelchair" color="info"></Icon>
      &nbsp;{this.props.handiCheckStatus}</p>
  )
}




    return (
      <StyleRoot>
        <Modal show={this.props.show} className="modalBox" onClose={this.props.close} {...this.props.modal} closeOnBlur={true}>
          <div className="editDiv modal-content" style={fadeInAnimation.fadeIn} >
            <Button className="editBackBtn is-small" onClick={this.props.handleEditBackButton}>
              <Icon className="fas fa-backward"></Icon>
              &nbsp;&nbsp;Back</Button>
            <h1 className="editTitle"><Icon className="fas fa-edit" color="warning"></Icon>
              &nbsp;Edit this Marker</h1>

            <div className="mockMarker">
              <h5 className="mockMarkerName">{this.props.editedName}</h5>
              <h5 className="mockMarkerAddress">{this.props.editedLocationName}</h5>
              {babyCheckboxStatus}
              {handiCheckboxStatus}
              <div className="mockMarkerRating">
                <StarRatingComponent
                  name="rate6"
                  starCount={5}
                  value={this.props.currentMarker.rating}
                  editing={false}
                />
              </div>
              <div className="mockButtons">
                <Button className="is-small is-static"><Icon className="fas fa-edit"></Icon>
                  &nbsp;Edit Marker</Button>
                <Button className="is-small is-static"><Icon className="fas fa-trash-alt"></Icon>
                  &nbsp;Delete Marker</Button>
                {/* <Button onClick={this.sidebarCheckStatesLog}>ConsoleLog2</Button> */}
              </div>
            </div>

            <div className="boxSeparator">

              <div className="editBoxesDiv">
                <label className="editNameLabel">Bathroom Name: </label>
                <input className="editNameBox" key={this.props.marker} id="editedName" type="text" value={this.props.editedName} maxLength="30" onChange={this.props.handleEditTextboxState}></input>
                <label className="editLocationLabel">Location Name: </label>
                <input className="editLocationBox" key={this.props.marker} id="editedLocationName" type="text" maxLength="30" value={this.props.editedLocationName} onChange={this.props.handleEditTextboxState}></input>
              </div>

              <div className="checkSeparator">

                <div className="editBabyCheckField">
                  {/* #1 */}
                  <input id="editBabyStationCheck" className="editBabyStation" type="checkbox" defaultChecked={this.props.currentMarker.changingStation_2} onClick={this.props.handleEditBabyStationCheckChange}></input>
                  <Icon className="fas fa-baby" color="info"></Icon>
                  &nbsp;<label className="editBabyCheckLabel">Baby Changing Station</label>
                </div>
                {/* #2 */}
                <div className="editHandiAccessCheckField">
                  <input id="editHandicapAccessCheck" className="editHandiAccess" type="checkbox" defaultChecked={this.props.currentMarker.handicapAccess_2} onClick={this.props.handleEditHandiAccessCheckChange}></input>
                  <Icon className="fas fa-wheelchair" color="info"></Icon>
                  &nbsp;<label className="editHandiAccessLabel">Handicap Access</label>
                </div>

                <div>
                  <p className="editRatingTitle">Your Rating: </p>
                  <StarRatingComponent
                    name="rate7"
                    starCount={5}
                    value={this.props.rating}
                    onStarClick={this.props.onStarClick.bind(this)}
                    editing={true}
                  />
                </div>

              </div>

              {/* <Button onClick={this.props.consoleLog}></Button> */}
            </div>

            <div className="editSubmitBtnDiv">
              <Button className="markItButton" color="link" onClick={() => this.props.changeStateAndSubmitEdit()}>Submit Changes</Button>
            </div>

          </div>

        </Modal>
      </StyleRoot>
    )



  }


}