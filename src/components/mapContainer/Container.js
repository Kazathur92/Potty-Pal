import React, { Component } from 'react';
import { Map, InfoWindow, Marker, GoogleApiWrapper } from 'google-maps-react';
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
    selectedPlace: {}
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


  render() {

    const pos = { lat: 36.1627, lng: -86.7916 }
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





// ================USING GOOGLE-MAPS-REACT====================================

      return (
      <Map google={this.props.google} style={style} zoom={14} initialCenter={{
        lat: 36.1627,
        lng: -86.7816
      }}

        onClick={this.onMapClick}>

        {/* <Marker
                name={'Current location'} /> */}

        <Marker
          onClick={this.onMarkerClick}
          name={'Dolores park'}
          address={'2929 Steamboat Dr.'}
          position={pos} />



        <InfoWindow marker={this.state.activeMarker}
          visible={this.state.showingInfoWindow}
          className="infoWindows"
          onClose={this.onInfoWindowClose}>
          <div>
            <h1>{this.state.selectedPlace.name}</h1>
            <p>{this.state.selectedPlace.address}</p>
          </div>
        </InfoWindow>
      </Map>
    );
  }

}

export default GoogleApiWrapper({
  apiKey: ("AIzaSyDOEBqiYykHzoCJyKAij9f2UwaF-DxtuBs")
  // apiKey: ("AIzaSyDt5XcKR4N-Gm0W525I90N-xunjpzPZhNA") not being used
})
  (MapContainer)

// ==============================================================================