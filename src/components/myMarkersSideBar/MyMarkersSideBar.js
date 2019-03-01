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
        sideBarActive: true,
        userMarkers: []
    }

    toggleSideBarAnimation_1 = () => {


        if (this.state.sideBarActive) {
            this.setState({
                sideBarActive: false
            })

        } else {
            this.setState({
                sideBarActive: true
            })
        }
    }

    // mapping through all the markers, finding all of the user markers and sticking those in an array
    //my theory is if I can get it to display a list based on an array with all the users markers it might be
    //better to manage and set a specific height.
    //I might have to use state to store the amount of markers as if it was an array.
    consoleLog = () => {
        console.log("real state", this.props.userMarkers)
        // console.log(myMarkers)
        // let myMarkers = []

        // this.props.markers.map(currentMarker => {
        //   if(currentMarker.user_Id === +sessionStorage.userID){
        //   myMarkers.push(currentMarker)
        //   }
        // })

        // console.log("console log array", myMarkers)

        // if (myMarkers.length < 4) {
        // console.log("Marker 1: ", myMarkers[0], "Marker 2: ", myMarkers[2])
        // }
    }

    // setingUserMarkers = () => {
    //   let myMarkers = []
    //   this.props.markers.map(currentMarker => {
    //     if(currentMarker.user_Id === +sessionStorage.userID){
    //       myMarkers.push(currentMarker)
    //     }
    //   })
    //           this.setState({
    //             userMarkers: myMarkers
    //           })
    //           // .catch(function () {
    //           //   alert("oops error")
    //           // })
    // }

    // componentDidMount = () => {
    // this.setingUserMarkers()
    // }

    render() {

        let myMarkers = []
        // this.props.markers.map(currentMarker => {
        //   if(currentMarker.user_Id === +sessionStorage.userID){
        //   myMarkers.push(currentMarker)
        //   }
        //   // console.log(myMarkers)
        // })

        // let first3Markers = <p>{this.state.userMarkers[1].name}</p>



        // this is saying that let markerCard be all of the stuff below, if I can make markerCard be an array
        // of user markers that can then be display I could possibly limit the amount of markers that can be display.
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
                    // if(currentMarker.length < 4) {

                    return (<MarkerItem
                        key={currentMarker.id}
                        marker={currentMarker}
                        userMarkers={this.state.userMarkers}
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
                        userMarkers={this.props.userMarkers}
                    />
                    )
                    // }
                }
                else {
                    markerCard = null
                }
            }
            )



        //not in use, supposed to change animation when sidebar closed
        // let animation =""

        // if(this.state.sideBarActive) {
        //   animation = slideInLeftAnimation.slideInLeft
        // } else {
        //   animation = slideOutLeftAnimation.slideOutLeft
        // }

        return (
            <StyleRoot>
                <div style={slideInLeftAnimation.slideInLeft} className="" onMouseOver={this.toggleSideBarAnimation_1}>
                    <Container className="cardContainer sideBarDiv">
                        <h6 className="sidebarTitle"><Icon className="fas fa-chevron-circle-left sidebarCloseButton" onClick={this.props.handleMyMarkerButtonState}></Icon>
                            &nbsp;MARKER COLLECTION</h6>
                        {/* <Button onClick={this.consoleLog}>console log</Button> */}
                        <nav className="sideBarNav">
                            {markerCard}

                        </nav>
                    </Container>
                </div>
            </StyleRoot>
        )
    }
}