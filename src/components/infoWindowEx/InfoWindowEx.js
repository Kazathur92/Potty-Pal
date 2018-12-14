import React, { Component } from 'react'
import ReactDOM from 'react-dom';
import { InfoWindow } from 'google-maps-react';

export default class InfoWindowEx extends Component {
  constructor(props) {
    super(props);
    this.infoWindowRef = React.createRef();
    if (!this.containerElement) {
      this.containerElement = document.createElement(`div`);
    }
  }


  onInfoWindowOpen = () => {
    ReactDOM.render(React.Children.only(this.props.children), this.containerElement);
    this.infoWindowRef.current.infowindow.setContent(this.containerElement);
  }

  render() {
    return <InfoWindow onOpen={this.onInfoWindowOpen} onClose={this.props.onInfoWindowClose}  ref={this.infoWindowRef} {...this.props}>
    <h1>DENIED!</h1>
    </InfoWindow>
  }
}