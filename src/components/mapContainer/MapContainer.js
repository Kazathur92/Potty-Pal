import React, { Component } from 'react';
import { Map, InfoWindow, Marker, GoogleApiWrapper, google } from 'google-maps-react';
import Geolocation from "../geolocation/Geolocation"
import Geocode from "react-geocode"
import { geolocated } from 'react-geolocated';
import InfoWindowEx from '../infoWindowEx/InfoWindowEx'

// import GoogleMapReact from 'google-map-react'; //using google-map-react
import "./Container.css"

// =================USING GOOGLE-MAPS-REACT==============================
const style = {
  // justifyContent: 'left',
  borderRadius: '15px',
  border: 'solid 5px black',
  margin: 'auto',
  marginTop: '0px',
  width: '60%',
  height: '70%'
}


export class MapContainer extends Component {

  state = {
    //google-maps-react
    showingInfoWindow: false,
    activeMarker: {},
    selectedPlace: {},
    newMarker: false,
    currentLocation: "",
    //buttons state to show or not show
    addressButton: false,
    currentLocationButton: false,
    // interactionBar: false,
    userBarSelection: false,
    infoWindowContent: true,
    editFields: false,
    editButton: false,
    changingStation: false,
    handicapAccess: false,
    //satates for values
    userLocation: { lat: 40.6627, lng: 86.7816 }, //without the currentGeo
    loading: true,
    location: "",
    lat: "",
    lng: "",
    //states for text box values
    currentName: "",
    currentLocationName: "",
    editedName: "",
    editedLocationName: ""
  }

  //only use if not using currengGeo state
  // without the currentGeo
  componentDidMount() {
    navigator.geolocation.getCurrentPosition(
      position => {
        const { latitude, longitude } = position.coords;

        this.setState({
          userLocation: { lat: latitude, lng: longitude },
          loading: false
        });
        console.log(this.state.userLocation)
      },
      () => {
        this.setState({ loading: false })
      }
    )
  }

  //==========================GEOCODE API FETCH and POST ======================
  geocodeLocation = () => {
    Geocode.setApiKey("AIzaSyDOEBqiYykHzoCJyKAij9f2UwaF-DxtuBs")
    console.log('location: ', this.state.location)
    Geocode.fromAddress(this.state.location).then(
      response => {
        console.log('happened 3', response)
        const latitude = response.results[0].geometry.location.lat;
        // console.log("latitude",latitude);
        const longitude = response.results[0].geometry.location.lng;
        // console.log("longitude", longitude)
        this.setState({
          lat: latitude,
          lng: longitude
        })

        let userID = sessionStorage.getItem("userID")

        // console.log("lat state", this.state.lat)
        let bathroom = {
          name: this.state.currentName,
          location: this.state.location,
          lat: this.state.lat,
          lng: this.state.lng,
          public: true,
          changingStation: false,
          handicapAccess: false,
          user_Id: +userID
        }
        this.props.addMarker(bathroom);
      },
      error => {
        console.error(error);
      }
    )
  }
  //==================================================================================

  // isAuthenticated = () => { sessionStorage.getItem("credentials") !== null}
  //  isAuthenticated = () => {

  //   let authorized = false

  //    if (sessionStorage.getItem("credentials")) {
  //      authorized = true
  //    }
  //    else {
  //      authorized = false
  //    }
  //  }


  getInitialState() {
    return {
      showingInfoWindow: false,
      activeMarker: {},
      selectedPlace: {}
    }
  }

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

  //not in use
  onInfoWindowClose = () => {
    // if (this.state.showingInfoWindow) {

    this.setState({
      showingInfoWindow: false,
      activeMarker: null,
      editButton: false,
      infoWindowContent: true,

    })
    console.log(this.state.showingInfoWindow)

    // }
  }

  //======================ADD BATHROOM SELECTIONS=====================
  handleAddressBoxState = () => {
    console.log("hi")
    this.setState({
      addressButton: !this.state.addressButton,
      currentLocationButton: false,
      userBarSelection: false

    })
  }

  handleCurrentLocationBoxState = () => {
    this.setState({
      addressButton: false,
      currentLocationButton: true,
      userBarSelection: false
    })
  }

  handleAddBathroomSelectionState = () => {
    this.setState({ userBarSelection: true })
  }

  handleBackButtonState = () => {
    this.setState({
      addressButton: false,
      currentLocationButton: false,
      userBarSelection: true,
    })
  }

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

// handleCheckBoxChange = (evt) => {
//   if (evt.target.checked) {
//     const

//   }
// }



//========================================CHECKBOXES END=========================







  //==================================================================

  handleLogOutStateChanges = () => {
    this.props.logOutButton()

    this.setState({
      interactionBar: false,
      addressButton: false,
      userBarSelection: false
    })
  }
  //+
  handleTextBoxState = (evt) => {
    // console.log(evt)
    // console.log("targetid", evt.target.id)
    // console.log("targetValue", evt.target.value)
    // console.log("selectedPlace", this.state.selectedPlace)
    const stateToChange = {}
    stateToChange[evt.target.id] = evt.target.value
    this.setState(stateToChange)
    console.log(stateToChange)
  }


  //=================INFO WINDOW STATES===========================
  //this changes the state of the infowindow content
  handleInfoWindowContentState = () => {

    this.setState({
      editButton: true,
      userBarSelection: false,
      currentLocationButton: false,
      addressButton: false
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
    // console.log(evt)
    // console.log("markerID", this.state.activeMarker.id)
    console.log("targetid", evt.target.id)
    // console.log("markerValue", this.state.activeMarker.value)
    console.log("targetValue", evt.target.value)
    // console.log("selectedPlace", this.state.selectedPlace)
    // console.log("selectedPlaceValue", this.state.selectedPlace.value)

    const stateToChange = {}
    stateToChange[evt.target.id] = evt.target.value
    this.setState(stateToChange)
    console.log(stateToChange)

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

    let userID = sessionStorage.getItem("userID")

    if (this.state.currentName === "") {
      window.alert("Bathroom needs a name");
    } else {
      const newCurrentGeoBathroom = {
        name: this.state.currentName,
        location: this.state.currentLocationName,
        lat: this.props.currentGeo.lat,
        lng: this.props.currentGeo.lng,
        changingStation: false,
        handicapAccess: false,
        user_Id: +userID
      }
      this.props.addMarker(newCurrentGeoBathroom);
    }

  }

  //EDIT
  constructNewEditedMarker = () => {

    const editedMarker = {
      name: this.state.editedName,
      location: this.state.editedLocationName,
    }

    this.props.editMarker(editedMarker, this.state.activeMarker.id)
  }
  //=====================================================


  //CONSOLE LOG
  consoleLog = () => {
    console.log(this.state.currentName)
    console.log(this.state.selectedPlace.id)
  }

  render() {

    //only use if not using currentGeo state in initialCenter of Map component tag
    const { loading, userLocation } = this.state

    if (loading) {
      return null
    }
    //====================================================



    //==CONDITIONAL STATEMENT VARIABLES==
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
    if (this.state.addressButton) {
      searchBox = (
        <div className="searchLocationBox">
          <button className="searchBackButton" onClick={this.handleBackButtonState}>Back</button>
          <button className="searchSwitchModeBtn" onClick={this.handleSearchSwitchModeButton}>By Current Location</button>
          <h1 className="searchWindowTitle">Add by Location Name</h1>
          <div className="searchTextBoxes">
            <label className="currentNameLabel">Bathroom Name: </label>
            <input id="currentName" className="currentNameTextbox" size="15" type="text" placeholder="Bathroom Name" onChange={this.handleTextBoxState}></input>
            <label className="locationLabel">Which location?</label>
            <input id="location" className="locationTextbox" type="text" placeholder="Search Location" onChange={this.handleTextBoxState}></input>
          </div>
          <div className="searchCheckBoxes">
            <label className="babyStationCheckLabel">Baby Changing Station: </label>
            <input id="babyStationCheck" type="checkbox"></input>
            <label className="handiAccessCheckLabel">Handicap Access: </label>
            <input id="handiAccessCheck" type="checkbox"></input>
          </div>
          <div>
            <button className="markItButton" onClick={this.constructNewBathroom}>Mark It</button>
          </div>
        </div>
      );
    } else {
      searchBox = null
    }

    //not working
    if (this.props.sessionStorage === true && this.state.addressButton === false && this.state.currentLocationButton === false && this.state.editButton === false)
    // if (this.props.sessionStorage)
    {
      userBar = (
        <div id="interactionBar" className="interactionBar">
          <div id="logOutButtonField" className="logOutButtonField">
            <button id="logOutButton" className="logOutButton" onClick={this.handleLogOutStateChanges}>Log Out</button>
          </div>
          <div className="userBar">
            <button type="submit" className="addButton noBorder" onClick={this.handleAddBathroomSelectionState}>Add Bathroom</button>
            <button className="favoritesButton" onClick={this.handleFieldChange}>Favorites</button>
            <button className="trendingButton" onClick={this.handleFieldChange}>Trending</button>
          </div>
        </div>
      );
    }

    else {
      userBar = null
    }

    if (this.state.userBarSelection) {
      userBarSelectionButtons = (
        <div className="addBathroomSelectionBar">
          <button onClick={this.handleCloseButtonState}>Close</button>
          <button onClick={this.handleCurrentLocationBoxState}>Current Location</button>
          <button onClick={this.handleAddressBoxState}>Search Address</button>
        </div>
      );
    } else {
      userBarSelectionButtons = null
    }
    //@
    if (this.state.currentLocationButton) {
      currentLocationTextboxes = (
        // new Marker("name")
        <div className="currentLocationBoxes">
          <button className="currLocBackBtn" onClick={this.handleBackButtonState}>Back</button>
          <button className="currSwitchModeBtn" onClick={this.handleCurrSwitchModeButton}>By Search Location</button>
          <h1 className="currLocTitle">Add Using Current Location</h1>
          <div className="currLocTextBoxes">
            <label className="currLocNameLabel">Bathroom Name: </label>
            <input id="currentName" className="currLocName" size="15" type="text" placeholder="Bathroom Name" onChange={this.handleTextBoxState}></input>
            <label className="currLocationNameLabel">Bathroom Location: </label>
            <input id="currentLocationName" className="currLocationName" type="text" placeholder="Bathroom Location" onChange={this.handleTextBoxState}></input>
          </div>
          <div className="currCheckBoxes">
            <label className="currBabyStationCheckLabel">Baby Changing Station: </label>
            <input className="currBabyStationCheck" type="checkbox"></input>
            <label className="currHandiAccessCheckLabel">Handicap Access: </label>
            <input className="currHandiAceesCheck" type="checkbox"></input>
          </div>
          <div className="currMarkIt">
            <button className="currMarkItButton" onClick={this.constructNewCurrentGeoBathroom}>Mark It</button>
          </div>
        </div>
      );
    }
    else {
      currentLocationTextboxes = null
    }


    //========================INFO WINDOW CONTENT========================

    if (this.props.sessionStorage) {
      infoWindowButtons = (
        <div>
          <button id="editButton" type="button" onClick={this.handleInfoWindowContentState}>
            Edit Marker
      </button>
          <button id="deleteButton" type="button" onClick={() => this.props.deleteMarker(this.state.activeMarker.id)}>
            Delete Marker
      </button>
        </div>
      )
    } else {
      infoWindowButtons = null
    }



    if (this.state.showingInfoWindow && this.state.infoWindowContent) {
      infoWindowContent = (

        <div id="infoWindowContent">
          <h2 id="currentName" >{this.state.selectedPlace.name}</h2>
          <p id="currentLocationName">{this.state.selectedPlace.address}</p>
          <p>changing Station: {this.state.selectedPlace.changingStation}</p>
          <p>Handicap Access: {this.state.selectedPlace.handicapAccess}</p>
          {infoWindowButtons}
        </div>
      );
    }
    else {
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
            <label className="editBabyCheckLabel">Baby Changing Station: </label>
            <input className="editBabyStation" type="checkbox"></input>
            <label className="editHandiAccessLabel">Handicap Access: </label>
            <input className="editHandiAccess" type="checkbox"></input>
          </div>
          <button className="editSubmitBtn" onClick={() => this.handleSubmitChangesButtonState()}>Submit Changes</button>
        </div>
      );
    }
    else {
      infoWindowEditBoxes = null
    }
    //=========================================================================





    let makeMarker = this.props.markers.map(currentMarker => {
      return (
        <Marker
          key={currentMarker.id}
          id={currentMarker.id}
          onClick={this.onMarkerClick}
          name={currentMarker.name}
          address={currentMarker.location}
          position={currentMarker}
          draggable={true}
          onDragend={this.centerMoved} />
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
          icon={icon}
        >

          <div >
            {infoWindowContent}

          </div>
        </InfoWindowEx>
      )

    })

    //
    //======================END of CONDITIONAL STATEMENTS==================================


    var icon = {
      url: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSiknkRWF5-KdXhXi529gXPrqMPloBU-dqS3p3Qoiiq8ONyKgBZ", // url
      scaledSize: new this.props.google.maps.Size(90, 42), // scaled size
    }

    // ================USING GOOGLE-MAPS-REACT====================================

    return (
      <div>
        {searchBox}
        {currentLocationTextboxes}
        {infoWindowEditBoxes}
        <div>
          {userBar}
        </div>
        {userBarSelectionButtons}

        {/* <button onClick={this.consoleLog}>console log current location</button> */}
        <div>
          <br></br>
          <Map id="Map" google={this.props.google} style={style} zoom={14} initialCenter={userLocation}

            onClick={this.onMapClick}>

            {/* icon={{
              url: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSiknkRWF5-KdXhXi529gXPrqMPloBU-dqS3p3Qoiiq8ONyKgBZ",
               anchor: new google.maps.Point(32,32),
              scaledSize: new google.maps.Size(64,64)
             }} */}

            <Marker
              onClick={this.onMarkerClick}
              name={"Shelby Park"}
              address={"Nashville, TN 37206"}
              position={{ lat: 36.1676, lng: -86.7297 }}
              draggable={true}
              onDragend={this.centerMoved} />


            <Marker
              onClick={this.onMarkerClick}
              name={"Whitsett Park"}
              address={"375 Wimpole Dr, Nashville, TN 37211"}
              position={{ lat: 36.1197, lng: -86.7245 }}
              draggable={true}
              onDragend={this.centerMoved} />

            <Marker
              onClick={this.onMarkerClick}
              name={"H.G. Hill Park"}
              address={"6710 Charlotte Pike, Nashville, TN 37209"}
              position={{ lat: 36.0926, lng: -86.7121 }}
              draggable={true}
              onDragend={this.centerMoved} />

            <Marker
              onClick={this.onMarkerClick}
              name={"Grand Ole Opry"}
              address={"2804 Opryland Dr, Nashville, TN 37214"}
              position={{ lat: 36.2069, lng: -86.6921 }}
              draggable={true}
              onDragend={this.centerMoved} />

            <Marker
              onClick={this.onMarkerClick}
              name={"Paragon Mills Park"}
              address={"465 Benita Dr, Nashville, TN 37211"}
              position={{ lat: 36.0926, lng: -86.7121 }}
              draggable={true}
              onDragend={this.centerMoved} />

            <Marker
              onClick={this.onMarkerClick}
              name={"Percy Warner Park"}
              address={"50 Vaughn Rd, Nashville, TN 37221"}
              position={{ lat: 36.0611, lng: -86.8980 }}
              draggable={true}
              onDragend={this.centerMoved} />

            <Marker
              onClick={this.onMarkerClick}
              name={"Centennial Park"}
              address={"2500 West End Ave, Nashville, TN 37203"}
              position={{ lat: 36.1490, lng: -86.8120 }}
              draggable={true}
              onDragend={this.centerMoved} />

            <Marker
              onClick={this.onMarkerClick}
              name={"Music City Central"}
              address={"400 Charlotte Ave, Nashville, TN 37219"}
              position={{ lat: 36.1664, lng: -86.7815 }}
              draggable={true}
              onDragend={this.centerMoved} />

            <Marker
              onClick={this.onMarkerClick}
              name={"Nashville Public Square Park"}
              address={"Union St & 3rd Ave N, Nashville, TN 37243"}
              position={{ lat: 36.1666, lng: -86.7781 }}
              draggable={true}
              onDragend={this.centerMoved} />

            <Marker
              onClick={this.onMarkerClick}
              name={"Elizabeth Park"}
              address={"1701 Arthur Ave, Nashville, TN 37208"}
              position={{ lat: 36.1759, lng: -86.8057 }}
              draggable={true}
              onDragend={this.centerMoved} />

            <Marker
              onClick={this.onMarkerClick}
              name={"Metro Government of Nashville & Davidson County - Parks and Recreation"}
              address={"511 Oman St, Nashville, TN 37203"}
              position={{ lat: 36.1472, lng: -86.8207 }}
              draggable={true}
              onDragend={this.centerMoved} />

            <Marker
              onClick={this.onMarkerClick}
              name={"Nashville Public Library"}
              address={"615 Church St, Nashville, TN 37219"}
              position={{ lat: 36.1621, lng: -86.7817 }}
              draggable={true}
              onDragend={this.centerMoved} />

            <Marker
              onClick={this.onMarkerClick}
              name={"Proctor Barn"}
              address={"5601-, 5615 Old Hickory Blvd, Nashville, TN 37218"}
              position={{ lat: 34.3428, lng: -85.3415 }}
              draggable={true}
              onDragend={this.centerMoved} />

            <Marker
              onClick={this.onMarkerClick}
              name={"Cedar Hill Parl"}
              address={"6860 Old Hickory Blvd, Madison, TN 37115"}
              position={{ lat: 36.2718, lng: -86.7481 }}
              draggable={true}
              onDragend={this.centerMoved} />

            {makeMarker}

            {/* <Geolocation /> */}

            {makeinfoWindows}
            {/* <InfoWindowEx
              marker={this.state.activeMarker}
              visible={this.state.showingInfoWindow}
              selectedPlace={this.state.selectedPlace}
              >

              <div >
                {infoWindowEditBoxes}
                {infoWindowContent}
                <input type="text" placeholder="test" onInput={this.handleTextBoxState}></input>

              </div>
              </InfoWindow>
            </InfoWindowEx> */}

          </Map>
        </div>
      </div>
    );
  };
}

export default GoogleApiWrapper({
  apiKey: ("AIzaSyDOEBqiYykHzoCJyKAij9f2UwaF-DxtuBs")
})
  (MapContainer)

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
