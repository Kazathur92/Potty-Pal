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
    interactionBar: false,
    userBarSelection: false,
    infoWindowContent: true,
    editFields: false,
    //satates for values
    // userLocation: { lat: "", lng: "" }, //without the currentGeo
    loading: false,
    location: "",
    currentName: "",
    currentLocationName: "",
    editedName: "",
    editedLocationName: ""
  }

  // componentDidMount() {
  // without the currentGeo
  //   navigator.geolocation.getCurrentPosition(
  //     position => {
  //       const { latitude, longitude } = position.coords;

  //       this.setState({
  //         userLocation: { lat: latitude, lng: longitude },
  //         loading: false
  //       });
  //       console.log(this.state.userLocation)
  //     },
  //     () => {
  //       this.setState({ loading: false })
  //     }
  //   )
  // }

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
        // console.log("lat state", this.state.lat)
        let bathroom = {
          // date: this.state.date,
          location: this.state.location,
          // birdId: this.state.birds.find(b => b.name === this.state.birdId).id,
          // summary: this.state.summary,
          lat: this.state.lat,
          lng: this.state.lng,
          // user_id: +this.state.currentUserId
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
        activeMarker: null
      });
    }
  }

  onMarkerClick = (props, marker, e) => {
    console.log(marker, props)
    this.setState({
      selectedPlace: props,
      activeMarker: marker,
      showingInfoWindow: true
    });
  }

  onInfoWindowClose = () => {
    this.setState({
      showingInfoWindow: false,
      activeMarker: null
    })
  }


  handleFieldChangeAddressBox = () => {
    console.log("hi")
    this.setState({
      addressButton: !this.state.addressButton,
      currentLocationButton: false
    })
  }

  handleFieldChangeCurrentLocationBox = () => {
    this.setState({
      addressButton: false,
      currentLocationButton: true
    })
  }

  handleAddBathroomSelectionState = () => {
    this.setState({ userBarSelection: true })
  }

  handleLogOutStateChanges = () => {
    this.props.logOutButton()

    this.setState({
      interactionBar: false,
      addressButton: false,
      userBarSelection: false
    })
  }

  handleTextBoxState = (evt) => {
    const stateToChange = {}
    stateToChange[evt.target.id] = evt.target.value
    this.setState(stateToChange)
    console.log(stateToChange)
  }


  handleInfoWindowContentState = () => {

    this.setState({
      editButton: true,
      infoWindowContent: false
    })

  }

  handleEditTextboxState = (evt) => {
    const stateToChange = {}
    console.log(evt.target.id)

    stateToChange[evt.target.id] = evt.target.value
    this.setState(stateToChange)
    console.log(stateToChange)
  }


  handleSubmitChangesButtonState = () => {



    this.setState({
      editButton: false,
      infoWindowContent: true
    })

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

  //typing address
  constructNewBathroom = () => {
    if (this.state.location === "") {
      window.alert("Textbox is empty");
    } else {
      this.geocodeLocation()

    }
  };

  //current location
  constructNewCurrentGeoBathroom = () => {
    const newCurrentGeoBathroom = {
      name: this.state.currentName,
      location: this.state.currentLocationName,
      lat: this.props.currentGeo.lat,
      lng: this.props.currentGeo.lng
    }
    this.props.addMarker(newCurrentGeoBathroom);

  }

  constructNewEditedMarker = () => {
    // console.log("construct new edited marker")
    // let currentMarkerId = this.state.activeMarker.id
    // console.log(this.state.activeMarker)
    const editedMarker = {
      name: this.state.currentName,
      location: this.state.editedLocationName,
    }
    console.log(this.state.currentName)

    this.props.editMarker(editedMarker, 1)

  }
  //=====================================================

  consoleLog = () => {
    console.log(this.state.currentName)
    console.log(this.state.selectedPlace.id)
  }

  render() {

    //==CONDITIONAL STATEMENT VARIABLES==
    //=====user bar==============
    let userBar = ""
    let userBarSelectionButtons = ""
    let searchBox = ""
    let currentLocationTextboxes = ""
    //=====info window===========
    let infoWindowEditBoxes = ""
    let infoWindowContent = ""
    //====================================


 //=================================START of CONDITIONAL STATEMENTS=============================
    if (this.state.addressButton) {
      searchBox = (
        <div>
          <input id="location" type="text" placeholder="search address" onChange={this.handleTextBoxState}></input>
          <button onClick={this.constructNewBathroom}>Mark it</button>
        </div>
      );
    } else {
      searchBox = null
    }

    if (sessionStorage) {
      userBar = (
        <div id="interactionBar">
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
    } else {
      userBar = null
    }

    if (this.state.userBarSelection) {
      userBarSelectionButtons = (
        <div>
          <button onClick={this.handleFieldChangeCurrentLocationBox}>Current Location</button>
          <button onClick={this.handleFieldChangeAddressBox}>Search Address</button>
        </div>
      );
    } else {
      userBarSelectionButtons = null
    }

    if (this.state.currentLocationButton) {
      currentLocationTextboxes = (
        // new Marker("name")
        <div>
          <input id="currentName" type="text" placeholder="Bathroom Name" onChange={this.handleTextBoxState}></input>
          <input id="currentLocationName" type="text" placeholder="Location" onChange={this.handleTextBoxState}></input>
          <button onClick={this.constructNewCurrentGeoBathroom}>Mark It</button>
        </div>
      );
    }
    else {
      currentLocationTextboxes = null
    }


    //========================INFO WINDOW CONTENT========================


    if (this.state.showingInfoWindow && this.state.infoWindowContent) {
      infoWindowContent = (
        // new Marker("name")
        <div id="infoWindowContent">
          <div >
            <h2 id="currentName" >{this.state.selectedPlace.name}</h2>
            <p id="currentLocationName" >{this.state.selectedPlace.address}</p>
          </div>
          <button id="editButton" type="button" onClick={this.handleInfoWindowContentState}>
            Edit Marker
      </button>
          <button id="deleteButton" type="button" onClick={() => this.props.deleteMarker(this.state.activeMarker.id)}>
            Delete Marker
      </button>
        </div>
      );
    }
    else {
      infoWindowContent = null
    }


    if (this.state.editButton) {
      infoWindowEditBoxes = (

        <div>
          <input id="editedName" type="text" placeholder="New Bathroom Name" onChange={this.handleEditTextboxState}></input>
          <input id="editedLocationName" type="text" placeholder="New Bathroom Location" onChange={this.handleEditTextboxState}></input>
          <button onClick={this.handleSubmitChangesButtonState}>Submit Changes</button>
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

    //======================END of CONDITIONAL STATEMENTS==================================


    // ================USING GOOGLE-MAPS-REACT====================================

    return (
      <div>
        <div>
          {userBar}
        </div>
        {userBarSelectionButtons}
        {currentLocationTextboxes}
        {searchBox}
        {/* <button onClick={this.consoleLog}>console log current location</button> */}
        <div>
          <br></br>
          <Map id="Map" google={this.props.google} style={style} zoom={14} initialCenter={{ lat: 36.1627, lng: -86.7816 }}

            onClick={this.onMapClick}>

            {/* icon={{
              url: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSiknkRWF5-KdXhXi529gXPrqMPloBU-dqS3p3Qoiiq8ONyKgBZ",
               anchor: new google.maps.Point(32,32),
              scaledSize: new google.maps.Size(64,64)
             }} */}

            {makeMarker}

            <Geolocation />

            <InfoWindowEx
              marker={this.state.activeMarker}
              visible={this.state.showingInfoWindow}
              selectedPlace={this.state.selectedPlace}>

              <div >
                {infoWindowEditBoxes}
                {infoWindowContent}

              </div>
            </InfoWindowEx>

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
