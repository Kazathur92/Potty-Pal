import React, { Component } from 'react';
import { Map, Marker, GoogleApiWrapper } from 'google-maps-react';
import { Button, Modal, Icon } from "react-bulma-components/full";
import StarRatingComponent from 'react-star-rating-component';
import { slideInDown, flipInX, headShake } from 'react-animations'
import Radium, { StyleRoot } from 'radium';
import Geocode from "react-geocode"
import InfoWindowEx from '../infoWindowEx/InfoWindowEx'
import "./Container.css"

// =================USING GOOGLE-MAPS-REACT==============================
const style = {
  borderRadius: '15px',
  border: 'solid 5px black',
  margin: 'auto',
  marginTop: '0px',
  width: '95%',
  height: '80%'
}

//=============================ANIMATIONS==============================
const slideDownAnimation = {
  slideInDown: {
    animation: "1s",
    animationName: Radium.keyframes(slideInDown, "sildeInDown")
  }
}

// const slideUpAnimation = {
//   slideUpOut: {
//     duration: "1s",
//     animationName: Radium.keyframes(slideOutUp, "sildeOutUp")
//   }
// }

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
//=========================================================================


export class MapContainer extends Component {

  //============RATING COMPONENT============
  // constructor() {
  //   super();

  // this.state = {
  //   rating: 1
  // };
  // }

  onStarClick(nextValue, prevValue, name) {
    this.setState({ rating: nextValue });
  }
  //========================================

  // userID = parseInt(+sessionStorage.getItem("userID"))
  userID = +sessionStorage.userID

  state = {
    //google-maps-react
    showingInfoWindow: false,
    activeMarker: {},
    selectedPlace: {},
    newMarker: false,
    currentLocation: "",
    //rating-component
    rating: 0,
    //buttons state to show or not show
    addressButton: false,
    currentLocationButton: false,
    // interactionBar: false,
    show: false,
    userBarSelection: false,
    infoWindowContent: true,
    editFields: false,
    editButton: false,
    changingStation: "",
    handicapAccess: "",
    //satates for values
    userLocation: { lat: 40.6627, lng: -86.7816 }, //without the currentGeo
    loading: true,
    location: "",
    lat: "",
    lng: "",
    //states for text box values
    currentName: "",
    currentLocationName: "",
    editedName: "",
    editedLocationName: "",
    //states for checkboxes
    babyStationCheck: false,
    handicapAccessCheck: false
  }

  //Only use if not using currengGeo state
  // without the currentGeo
  componentDidMount() {
    navigator.geolocation.getCurrentPosition(
      position => {
        const { latitude, longitude } = position.coords;

        this.setState({
          userLocation: { lat: latitude, lng: longitude },
          loading: false
        });
        // console.log(this.state.userLocation)
      },
      () => {
        this.setState({ loading: false })
      }
    )


  }

  //==========================GEOCODE API FETCH and POST ======================
  geocodeLocation = () => {
    Geocode.setApiKey("AIzaSyDOEBqiYykHzoCJyKAij9f2UwaF-DxtuBs")
    // console.log('location: ', this.state.location)
    Geocode.fromAddress(this.state.location).then(
      response => {
        // console.log('happened 3', response)
        const latitude = response.results[0].geometry.location.lat;
        // console.log("latitude",latitude);
        const longitude = response.results[0].geometry.location.lng;
        // console.log("longitude", longitude)
        this.setState({
          lat: latitude,
          lng: longitude
        })


        // console.log("lat state", this.state.lat)
        let bathroom = {
          name: this.state.currentName,
          location: this.state.location,
          lat: this.state.lat,
          lng: this.state.lng,
          public: true,
          changingStation: this.state.babyStationCheck,
          handicapAccess: this.state.handicapAccessCheck,
          user_Id: +this.userID
        }
        this.props.addMarker(bathroom);
      },
      error => {
        console.error(error);
      }
    )
  }
  //==================================================================================

  //dont think you need
  getInitialState() {
    return {
      showingInfoWindow: false,
      activeMarker: {},
      selectedPlace: {}
    }
  }

  //need
  onMapClick = () => {
    if (this.state.showingInfoWindow) {
      this.setState({
        showingInfoWindow: false,
        activeMarker: null,
        editButton: false,
        infoWindowContent: true,
        editedName: ""
      });
    }
  }

  //need
  onMarkerClick = (props, marker, e) => {

    if (this.state.showingInfoWindow) {

      this.setState({
        selectedPlace: props,
        activeMarker: marker,
        showingInfoWindow: false,
        editButton: false,
        infoWindowContent: true,
        editedName: ""
      });
    } else {

      this.setState({
        selectedPlace: props,
        activeMarker: marker,
        showingInfoWindow: true
      });
    }
  }

  //need
  onInfoWindowClose = () => {
    this.setState({
      showingInfoWindow: false,
      activeMarker: null,
      editButton: false,
      infoWindowContent: true,

    })
  }

  //======================ADD BATHROOM SELECTIONS=====================
  handleAddressBoxState = () => {
    this.setState({
      addressButton: !this.state.addressButton,
      currentLocationButton: false,
      userBarSelection: false,
      show: true

    })
  }

  handleCurrentLocationBoxState = () => {
    this.setState({
      addressButton: false,
      currentLocationButton: true,
      userBarSelection: false,
      show: true
    })
  }

  handleAddBathroomSelectionState = () => {
    //modal
    this.setState({
      userBarSelection: true,
    })
  }

  handleBackButtonState = () => {
    //modal
    this.setState({
      addressButton: false,
      currentLocationButton: false,
      userBarSelection: true,
      // show: true,
    })
  }
  //animation
  handleCloseButtonState = () => {
    this.setState({
      userBarSelection: false
    })
  }

  handleSearchSwitchModeButton = () => {

    if (this.state.addressButton) {

      this.setState({
        addressButton: false,
        currentLocationButton: true
      })
    }
  }

  handleCurrSwitchModeButton = () => {
    if (this.state.currentLocationButton) {

      this.setState({
        addressButton: true,
        currentLocationButton: false
      })
    }
  }


  //========================================CHECKBOXES START======================

  handleBabyStationCheckChange = (evt) => {
    if (evt.target.checked) {

      this.setState({
        babyStationCheck: true
      })
    } else {
      this.setState({
        babyStationCheck: false
      })

    }
  }

  handleHandiAccessCheckChange = (evt) => {
    if (evt.target.checked) {
      this.setState({
        handicapAccessCheck: true
      })
    } else {
      this.setState({
        handicapAccessCheck: false
      })

    }
  }

  //========================================CHECKBOXES END=========================







  //==================================================================

  handleLogOutStateChanges = () => {
    this.props.logOutButton()

    this.setState({
      interactionBar: false,
      addressButton: false,
      userBarSelection: false,
      currentLocationButton: false,
    })
  }
  //+
  handleTextBoxState = (evt) => {
    const stateToChange = {}
    stateToChange[evt.target.id] = evt.target.value
    this.setState(stateToChange)
    // console.log(stateToChange)
  }


  //=================INFO WINDOW STATES===========================
  //this changes the state of the infowindow content
  handleInfoWindowContentState = () => {

    this.setState({
      editButton: true,
      userBarSelection: false,
      currentLocationButton: false,
      addressButton: false,
      babyStationCheck: false,
      handicapAccessCheck: false,
    })

  }

  handleEditBackButton = () => {

    this.setState({
      editButton: false,
    })
  }

  //=================================================================
  //+

  //this handles the state of the value from the textboxes inside the info window
  handleEditTextboxState = (evt) => {

    const stateToChange = {}
    stateToChange[evt.target.id] = evt.target.value
    this.setState(stateToChange)
    // console.log(stateToChange)

  }

  //
  handleSubmitChangesButtonState = () => {

    if (this.state.editedName !== "") {

      this.setState({
        editButton: false,
        infoWindowContent: true,
        showingInfoWindow: false,
      })

      this.constructNewEditedMarker()

    } else {
      window.alert("Bathroom needs a name");
    }
  }

  //need
  renderChildren() {

    const { children } = this.props;

    if (!children) return

    return React.Children.map(children, c => {
      return React.cloneElement(c, {
        map: this.map,
        google: this.props.google,
        mapCenter: this.state.currentLocation
      });
    })

  }
  // ===========C.R.U.D==================================

  //typing address POST
  constructNewBathroom = () => {
    if (this.state.location === "") {
      window.alert("Please provide a location for the marker.");
    } else {
      this.geocodeLocation()

    }
  };

  //current location POST
  constructNewCurrentGeoBathroom = () => {

    if (this.state.currentName === "") {
      window.alert("Bathroom needs a name");
    } else {
      //modal
      this.setState({
        show: false,
        addressButton: false,
        currentLocationButton: false,
        userBarSelection: true,
      })

      const newCurrentGeoBathroom = {
        name: this.state.currentName,
        location: this.state.currentLocationName,
        // lat: this.props.currentGeo.lat,
        // lng: this.props.currentGeo.lng,
        lat: this.state.userLocation.lat,
        lng: this.state.userLocation.lng,
        changingStation: false,
        handicapAccess: false,
        user_Id: +this.userID
      }
      this.props.addMarker(newCurrentGeoBathroom);
    }

  }

  //EDIT MARKER FUNCTION
  constructNewEditedMarker = () => {

    const editedMarker = {
      name: this.state.editedName,
      location: this.state.editedLocationName,
      changingStation: this.state.babyStationCheck,
      handicapAccess: this.state.handicapAccessCheck,
      rating: this.state.rating
    }
    this.props.editMarker(editedMarker, this.state.activeMarker.id)
  }


  deleteCurrentMarker = (id) => {


    this.setState({
      showingInfoWindow: false
    })
    this.props.deleteMarker(id)

  }
  //=====================================================

  //modal
  close = () => this.setState({
    show: false,
    addressButton: false,
    currentLocationButton: false,
    userBarSelection: true,
  });

  //CONSOLE LOG
  consoleLog = () => {
    console.log("selectedPlace", this.state.selectedPlace)
    console.log("selected place rating", this.state.selectedPlace.rating)
    console.log("active Marker id", this.state.activeMarker)
    console.log("infoWindow", this.currentInfoWindow)
    // console.log("this id", this.id)
    // console.log("currentLocation state", this.props.bathrooms)
    console.log(this.state.rating)
    console.log("userID", this.userID)
    console.log(sessionStorage)
    console.log("sessionStorage.userID = ", sessionStorage.userID)
  }


  //RENDER
  render() {

    // const { rating } = this.state;

    //this is so icons in the markers can load
    const { google } = this.props;

    //only use if not using currentGeo state in initialCenter of Map component tag
    const { loading, userLocation } = this.state


    if (loading) {
      return null
    }

    //====================================================



    //==CONDITIONAL STATEMENT VARIABLES==
    //=======logout========
    let logOutButton = ""
    //=====user bar==============
    let userBar = ""
    let userBarSelectionButtons = ""
    let searchBox = ""
    let currentLocationTextboxes = ""
    //=====info window===========
    let infoWindowEditBoxes = ""
    let infoWindowContent = ""
    let infoWindowButtons = ""
    //====================================


    //=================================START of CONDITIONAL STATEMENTS=============================
    if (this.state.addressButton && this.props.sessionStorage) {
      searchBox = (
        <Modal show={this.state.show} onClose={this.close} {...this.props.modal} closeOnBlur={true}>
          <div className="searchLocationBox modal-content">
            <Button className="searchBackButton is-small" onClick={this.handleBackButtonState}>
            <Icon className="fas fa-backward"></Icon>&nbsp;&nbsp;Back</Button>
            <Button className="searchSwitchModeBtn is-small is-rounded" onClick={this.handleSearchSwitchModeButton}>
            <Icon className="fas fa-map-marker-alt"></Icon>
            &nbsp;&nbsp;By Current Location</Button>
            <h1 className="searchWindowTitle">Add by Location Name</h1>
            <div className="searchTextBoxes">
              <label className="currentNameLabel">Bathroom Name: </label>
              <input id="currentName" className="currentNameTextbox" size="15" type="text" placeholder="Bathroom Name" onChange={this.handleTextBoxState}></input>
              <label className="locationLabel">Which location?</label>
              <input id="location" className="locationTextbox" type="text" placeholder="Search Location" onChange={this.handleTextBoxState}></input>
            </div>
            <div className="searchCheckBoxes">
              <label className="babyStationCheckLabel">Baby Changing Station: </label>
              <input id="babyStationCheck" onClick={this.handleBabyStationCheckChange} type="checkbox"></input>
              <label className="handiAccessCheckLabel">Handicap Access: </label>
              <input id="handiAccessCheck" onClick={this.handleHandiAccessCheckChange} type="checkbox"></input>
            </div>
            <div>
              <button className="markItButton" onClick={this.constructNewBathroom}>Mark It</button>
            </div>
          </div>
        </Modal>
      );
    } else {
      searchBox = null
    }


    //==================================================USER BAR=====================================================
    if (this.props.sessionStorage === true && this.state.addressButton === false && this.state.currentLocationButton === false && this.state.editButton === false) {
      userBar = (
        <StyleRoot>
          <div className="userBar" style={flipInAnimation.flipInX}>
            <Button type="submit" className="addButton is-normal is-rounded" style={headShakeAnimation.headShake} onClick={this.handleAddBathroomSelectionState}>
            <Icon className="fas fa-toilet"></Icon>&nbsp;Add Bathroom</Button>
            <Button className="favoritesButton is-normal is-rounded" onClick={this.handleFieldChange}>
            <Icon className="fas fa-heart"></Icon>&nbsp;&nbsp;Favorites</Button>
            <Button className="trendingButton is-normal is-rounded" onClick={this.handleFieldChange}>
            <Icon className="fas fa-star"></Icon>&nbsp;&nbsp;Trending</Button>
          </div>
        </StyleRoot>
      );
    } else {
      userBar = null
    }
    //=============================================USER BAR END=====================================================


    //============================LOG OUT BUTTON==============================
    if (this.props.sessionStorage === true) {
      logOutButton = (
        <StyleRoot>
          <Button id="logOutButton" style={flipInAnimation.flipInX} className="logOutButton is-normal is-rounded" onClick={this.handleLogOutStateChanges}><Icon className="fas fa-sign-out-alt"></Icon>&nbsp;&nbsp;Log Out</Button>
        </StyleRoot>
      )
    } else {
      logOutButton = null
    }
    //=============================LOG OUT END=================================

    if (this.state.userBarSelection) {
      userBarSelectionButtons = (
        <StyleRoot>
          <div key={7} className="addBathroomSelectionBar" style={slideDownAnimation.slideInDown}>
            <Button key={2} className="is-medium icon" onClick={this.handleCloseButtonState}>
              <Icon className="fas fa-angle-double-up iconStyle">
                {/* <span className="fas fa-toilet"/> */}
              </Icon>
            </Button>
            <Button key={3} onClick={this.handleCurrentLocationBoxState}>
            <Icon className="fas fa-map-marker-alt"></Icon>
            &nbsp;&nbsp;Current Location</Button>
            <Button key={4} onClick={this.handleAddressBoxState}>
            <Icon className="fas fa-search-location"></Icon>
            &nbsp;&nbsp;Search Location</Button>
          </div>
        </StyleRoot>
      );
    } else {
      userBarSelectionButtons = null
    }
    //@
    if (this.state.currentLocationButton && this.props.sessionStorage) {
      currentLocationTextboxes = (
        // new Marker("name")
        <Modal show={this.state.show} onClose={this.close} {...this.props.modal} closeOnBlur={true}>
          <div className="currentLocationBoxes modal-content">
            {/* <Modal.Actions> */}
            <Button className="currLocBackBtn is-small" onClick={this.handleBackButtonState}>
            <Icon className="fas fa-backward"></Icon>
            &nbsp;&nbsp;Back</Button>
            <Button className="currSwitchModeBtn is-small is-rounded" onClick={this.handleCurrSwitchModeButton}>
            <Icon className="fas fa-search-location"></Icon>
            &nbsp;&nbsp;By Search Location</Button>
            <h1 className="currLocTitle">Add Using Current Location</h1>
            <div className="currLocTextBoxes">
              <label className="currLocNameLabel">Bathroom Name: </label>
              <input id="currentName" className="currLocName" type="text" placeholder="Bathroom Name" onChange={this.handleTextBoxState}></input>
              <label className="currLocationNameLabel">Bathroom Location: </label>
              <input id="currentLocationName" className="currLocationName" type="text" placeholder="Bathroom Location" onChange={this.handleTextBoxState}></input>
            </div>
            <div className="currCheckBoxes">
              <label className="currBabyStationCheckLabel">Baby Changing Station: </label>
              <input className="currBabyStationCheck" type="checkbox" onClick={this.handleBabyStationCheckChange} ></input>
              <label className="currHandiAccessCheckLabel">Handicap Access: </label>
              <input className="currHandiAceesCheck" type="checkbox" onClick={this.handleHandiAccessCheckChange}></input>
            </div>
            <div className="currMarkIt">
              <button className="currMarkItButton" onClick={this.constructNewCurrentGeoBathroom}>Mark It</button>
            </div>
            {/* </Modal.Actions> */}
          </div>
        </Modal>
      );
    } else {
      currentLocationTextboxes = null
    }


    //========================INFO WINDOW CONTENT========================


    if (this.props.sessionStorage) {
      infoWindowButtons = (
        <div>
          <button id="editButton" type="button" onClick={this.handleInfoWindowContentState}>
            Edit Marker
      </button>
          <button id="deleteButton" type="button" onClick={() => this.deleteCurrentMarker(this.state.activeMarker.id)}>
            Delete Marker
      </button>
          {/* <button onClick={this.consoleLog}>Console Log</button> */}
        </div>
      )
    }
     else {
      infoWindowButtons = null
    }



    if (this.state.showingInfoWindow && this.state.infoWindowContent) {
      // console.log(this.state.selectedPlace)
      infoWindowContent = (

        <div id="infoWindowContent">
          <h1 id="currentNameInfo" >{this.state.selectedPlace.name}</h1>
          <br></br>
          <p id="currentLocationName">{this.state.selectedPlace.address}</p>
          <p>Baby Changing Station: {this.state.selectedPlace.changingStation}</p>
          <p>Handicap Access: {this.state.selectedPlace.handicapAccess}</p>
          {/* this is an If statement inside a render, a ternary */}
          <StarRatingComponent
            name="rate1"
            starCount={5}
            value={this.state.selectedPlace.rating}
            onStarClick={this.onStarClick.bind(this)}
          />
          {this.state.selectedPlace.userId === +sessionStorage.userID ? infoWindowButtons : null}
        </div>
      );
    } else {
      infoWindowContent = null
    }


    //@
    if (this.state.editButton) {
      infoWindowEditBoxes = (

        <div className="editDiv">
          <button className="editBackBtn" onClick={this.handleEditBackButton}>Back</button>
          <h1 className="editTitle">Edit this Marker</h1>
          <div className="editBoxesDiv">
            <label className="editNameLabel">Bathroom Name: </label>
            <input className="editNameBox" key={this.props.marker} id="editedName" type="text" placeholder="New Bathroom Name" onChange={this.handleEditTextboxState}></input>
            <label className="editLocationLabel">Location Name: </label>
            <input className="editLocationBox" key={this.props.marker} id="editedLocationName" type="text" placeholder="New Bathroom Location" onChange={this.handleEditTextboxState}></input>
          </div>
          <div className="editCheckDiv">
            <label className="editBabyCheckLabel" >Baby Changing Station: </label>
            <input className="editBabyStation" type="checkbox" onClick={this.handleBabyStationCheckChange}></input>
            <label className="editHandiAccessLabel">Handicap Access: </label>
            <input className="editHandiAccess" type="checkbox" onClick={this.handleHandiAccessCheckChange}></input>
          </div>
          <button className="editSubmitBtn" onClick={() => this.handleSubmitChangesButtonState()}>Submit Changes</button>
        </div>
      );
    } else {
      infoWindowEditBoxes = null
    }
    //=========================================================================

    let makeMarker = this.props.markers.map(currentUserMarker => {

      let changingStationLabel = ""
      let handicapAccessLabel = ""

      if (currentUserMarker.changingStation) {

        changingStationLabel = "yes"

      } else {

        changingStationLabel = "no"
      }

      if (currentUserMarker.handicapAccess) {

        handicapAccessLabel = "yes"

      } else {

        handicapAccessLabel = "no"
      }

      return (
        <Marker
          key={currentUserMarker.id}
          id={currentUserMarker.id}
          onClick={this.onMarkerClick}
          name={currentUserMarker.name}
          address={currentUserMarker.location}
          userId={currentUserMarker.user_Id}
          rating={currentUserMarker.rating}
          icon={{
            url: "https://cdn3.iconfinder.com/data/icons/map-and-location-fill/144/Place_Restroom-512.png",
            anchor: new google.maps.Point(32, 32),
            scaledSize: new google.maps.Size(35, 35)
          }}
          changingStation={changingStationLabel}
          handicapAccess={handicapAccessLabel}
          position={currentUserMarker}
          draggable={true}
          onDragend={this.centerMoved} />
      )
    })

    let makeDefaultMarkers = this.props.bathrooms.map(currentDefaultBathroom => {

      return (
        <Marker
          key={currentDefaultBathroom.id}
          id={currentDefaultBathroom.id}
          onClick={this.onMarkerClick}
          name={currentDefaultBathroom.name}
          address={currentDefaultBathroom.formatted_address}
          rating={currentDefaultBathroom.rating}
          icon={{
            url: "https://cdn0.iconfinder.com/data/icons/map-markers-2-1/512/xxx023-512.png",
            anchor: new google.maps.Point(32, 32),
            scaledSize: new google.maps.Size(25, 25)
          }}
          // changingStation={changingStationLabel}
          // handicapAccess={handicapAccessLabel}
          position={currentDefaultBathroom.geometry.location} />
      )
    })


    let makeinfoWindows = this.props.markers.map(currentInfoWindow => {
      return (
        <InfoWindowEx
          key={currentInfoWindow.id}
          id={currentInfoWindow.id}
          marker={this.state.activeMarker}
          visible={this.state.showingInfoWindow}
          selectedPlace={this.state.selectedPlace}
          onInfoWindowClose={this.onInfoWindowClose}
        >
          <div >
            {infoWindowContent}
          </div>
        </InfoWindowEx>
      )

    })

    //======================END of CONDITIONAL STATEMENTS==================================



    // ================USING GOOGLE-MAPS-REACT====================================

    return (
      <div className="background">
        {searchBox}
        {currentLocationTextboxes}
        {infoWindowEditBoxes}
        <div className="interactionBar">
          {logOutButton}
          {userBar}
        </div>
        {userBarSelectionButtons}

        <button onClick={this.consoleLog}>console log current location</button>
        <div>
          <br></br>
          <Map id="Map" google={this.props.google} style={style} className="background" zoom={14} initialCenter={userLocation}

            onClick={this.onMapClick}>

            {makeMarker}
            {makeDefaultMarkers}

            {makeinfoWindows}
          </Map>
        </div>
      </div>
    );
  };
}

export default GoogleApiWrapper({
  apiKey: ("AIzaSyDOEBqiYykHzoCJyKAij9f2UwaF-DxtuBs")
})(MapContainer)

  //===================================================END==============================================







    //     ============USING GOOGLE-MAP-REACT======NOT IN USE================
    //     const AnyReactComponent = ({ text }) => <div>{text}</div>;

    // export default class SimpleMap extends Component {

    //   static defaultProps = {
    //     center: {
    //       lat: 59.95,
    //       lng: 30.33
    //     },
    //     zoom: 11
    //   };

    //   render() {
    //     return (
    //       <div style={{ height: '100vh', width: '100%' }}>
    //       <GoogleMapReact
    //         bootstrapURLKeys={{ key: "AIzaSyDOEBqiYykHzoCJyKAij9f2UwaF-DxtuBs"}}
    //         defaultCenter={this.props.center}
    //         defaultZoom={this.props.zoom}
    //       >
    //          <AnyReactComponent
    //           lat={59.955413}
    //           lng={30.337844}
    //           text={'Kreyser Avrora'}
    //         />
    //       </GoogleMapReact>
    //     </div>

    // );
    // }

    // }
    // =========================================================================
