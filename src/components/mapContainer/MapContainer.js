import React, { Component } from 'react';
import { Map, InfoWindow, Marker, GoogleApiWrapper, google } from 'google-maps-react';
import Geolocation from "../geolocation/Geolocation"
import { geolocated } from 'react-geolocated';

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
    showingInfoWindow: false,
    activeMarker: {},
    selectedPlace: {},
    newMarker: false,
    markerCollection: [],
    currentLocation: "",
    addressButton: false
  }


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
    this.setState({ addressButton: !this.state.addressButton })
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
  addNewMarker = () => {

    // let markersLoading = AppManager.getAll().then(markers => {
    //   this.setState({
    //     markerCollection: markers
    //   });
    // });
    console.log(this.props.currentGeo)
    this.setState({
      newMarker: true
    })
  }
  //=====================================================


  render() {
    const newpos = this.props.currentGeo //make method inside the variable that figures out current location
    const pos = { lat: 36.1627, lng: -86.7916 }


    let newMarker = ""
    let searchBox = ""


    if (this.state.newMarker) {
      newMarker = (
        // new Marker("name")
        <Marker onClick={this.onMarkerClick} name={"Nashville Software School"} address={"500 Interstate Blvd S #300, Nashville, TN 37210"} position={newpos} draggable={true} />
      );
    }
    else {
      newMarker = null
    }



    if (this.state.addressButton) {
      searchBox = (
        <input type="text" placeholder="search address"></input>
      );
    } else {
      searchBox = null
    }


    // ===========================================================



    //     ============USING GOOGLE-MAP-REACT================
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



    //nashville coordinates:  { lat: 36.1627, lng: -86.7816 }

    // ================USING GOOGLE-MAPS-REACT====================================


    return (
      <div>
        <button onClick={this.addNewMarker}>Current Location</button>
        <button onClick={this.handleFieldChangeAddressBox}>Search Address</button>
        {searchBox}
        <div>
          <br></br>
          <Map id="Map" google={this.props.google} style={style} zoom={14} initialCenter={{ lat: 36.1627, lng: -86.7816 }}

            onClick={this.onMapClick}>


            <Marker id="woot"
              onClick={this.onMarkerClick}
              name={'Dolores park'}
              address={'2929 Steamboat Dr.'}
              position={pos}
              draggable={true}
              onDragend={this.centerMoved}
            // icon={{
            //   url: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSiknkRWF5-KdXhXi529gXPrqMPloBU-dqS3p3Qoiiq8ONyKgBZ",
            //   anchor: new google.maps.Point(32,32),
            //   scaledSize: new google.maps.Size(64,64)
            // }}
            />

            {newMarker}

            <Geolocation />

            <InfoWindow marker={this.state.activeMarker}
              visible={this.state.showingInfoWindow}
              className="infoWindows"
              onClose={this.onInfoWindowClose}>
              <div>
                <h2>{this.state.selectedPlace.name}</h2>
                <p>{this.state.selectedPlace.address}</p>
                <button>edit</button>
                <button>delete</button>
              </div>

            </InfoWindow>
          </Map>
        </div>
      </div>
    );
  }

}

export default GoogleApiWrapper({
  apiKey: ("AIzaSyDOEBqiYykHzoCJyKAij9f2UwaF-DxtuBs")
  // apiKey: ("AIzaSyDt5XcKR4N-Gm0W525I90N-xunjpzPZhNA") not being used
})
  (MapContainer)

// ==============================================================================