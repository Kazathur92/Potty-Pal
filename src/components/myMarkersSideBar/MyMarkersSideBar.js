import React, { Component } from 'react'
// import Card from 'react-bulma-components/lib/components/card';
import { Button, Modal, Icon, Card, Container } from "react-bulma-components/full";
import Radium, { StyleRoot } from 'radium';
import StarRatingComponent from 'react-star-rating-component';
import { slideInDown, rotateIn, flipInX, headShake, fadeIn, fadeOut, flipInY, slideInRight, slideInLeft, slideOutLeft } from 'react-animations'
import './MyMarkersSideBar.css'
import MarkerItem from "./MarkerItem"

//=============================ANIMATIONS================================
const rotateInAnimation = {
  rotateIn: {
    animation: "2s",
    animationName: Radium.keyframes(rotateIn, "rotateIn")
  }
}

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

const slideInRightAnimation = {
  slideInRight: {
    animation: "2s",
    animationName: Radium.keyframes(slideInRight, "slideInright")
  }

}

const slideInLeftAnimation = {
  slideInLeft: {
    animation: "1s",
    animationName: Radium.keyframes(slideInLeft, "slideInLeft")
  }
}

const slideOutLeftAnimation = {
  slideOutLeft: {
    animation: "1s",
    animationName: Radium.keyframes(slideOutLeft, "slideOutLeft")
  }
}

//==========================================================================

export default class MyMarkerSideBar extends Component {


  state = {
    noMarkersMessage: false,
    sideBarActive: true
  }

  toggleSideBarAnimation_1 = () => {


    if(this.state.sideBarActive) {
      this.setState({
        sideBarActive: false
      })

    } else {
      this.setState({
        sideBarActive: true
      })
    }
  }

  render() {

    let markerCard =

    this.props.markers.map(currentMarker => {
      // this.props.markers.filter( currentMarker => {
      let changingStationLabel = ""
      let handicapAccessLabel = ""

      if (currentMarker.changingStation) {


          changingStationLabel = "Available"

        } else {


          changingStationLabel = "Unavailable"
        }

        if (currentMarker.handicapAccess) {

          handicapAccessLabel = "Available"

        } else {

          handicapAccessLabel = "Unavailable"
        }


      const markerProperties = {
        id: currentMarker.id,
        name: currentMarker.name,
        location: currentMarker.location,
        changingStation: currentMarker.changingStation,
        changingStation_2: currentMarker.changingStation_2,
        handicapAccess: currentMarker.handicapAccess,
        handicapAccess_2: currentMarker.handicapAccess_2,
        public: currentMarker.public,
        lat: currentMarker.lat,
        lng: currentMarker.lng,
        rating: currentMarker.rating,
        user_Id: currentMarker.user_Id
      }

      if (currentMarker.user_Id === +sessionStorage.userID) {

      return (<MarkerItem
        key={currentMarker.id}
        marker={currentMarker}
        changingStation={changingStationLabel}
        handicapAccess={handicapAccessLabel}
        deleteMarker={this.props.deleteMarker}
        editMarker={this.props.editMarker}
        handleInfoWindowContentState_1={this.props.handleInfoWindowContentState_1}
        rating={this.state.rating}
        handleIconState_1={this.props.handleIconState_1}
        handleIconState_2={this.props.handleIconState_2}
        markerProperties={markerProperties}
        onMarkerClick={this.onMarkerClick}
        currentMarker={this.props.currentMarker}
        handleSidebarEditState={this.props.handleSidebarEditState}
        warningMessageToggleSideBar={this.props.warningMessageToggleSideBar}
        />
      )
      }
      else {
        markerCard = null
      }
    }
    )

    let animation =""

    if(this.state.sideBarActive) {
      animation = slideInLeftAnimation.slideInLeft
    } else {
      animation = slideOutLeftAnimation.slideOutLeft
    }

  return (
      <StyleRoot>
        <div style={slideInLeftAnimation.slideInLeft} className="" onMouseOver={this.toggleSideBarAnimation_1}>
        <Container className="cardContainer sideBarDiv">
        <h6><Icon className="fas fa-chevron-circle-left sidebarCloseButton" onClick={this.props.handleMyMarkerButtonState}></Icon>
&nbsp;MARKER COLLECTION</h6>
          <nav className="sideBarNav">
              {markerCard}
              <h5></h5>
              {/* {noMarkers} */}
          </nav>
          </Container>
        </div>
      </StyleRoot>
    )
  }
}