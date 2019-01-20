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
    return <InfoWindow onOpen={this.onInfoWindowOpen} onClose={this.props.onInfoWindowClose}  ref={this.infoWindowRef} {...this.props}/>
  }
}


//from text overflow, supposed to fix state rerender inside Infowindow, but it breaks when in use.
// export default class InfoWindowEx extends Component {
//   constructor(props) {
//     super(props);
//     this.state = {
//       isOpen: false
//     };
//     this.infoWindowRef = React.createRef();
//     this.containerElement = document.createElement(`div`);
//   }

//   componentDidUpdate(prevProps) {
//     if (this.props.children !== prevProps.children) {
//       ReactDOM.render(
//         React.Children.only(this.props.children),
//         this.containerElement
//       );
//       this.infoWindowRef.current.infowindow.setContent(this.containerElement);
//       this.setState({
//         isOpen: true
//       });
//     }
//   }

//   shouldComponentUpdate(nextProps, nextState) {
//     if (this.state.isOpen) {
//       return this.props.marker.position.toString() !== nextProps.marker.position.toString();
//     }
//     return true;
//   }

//   infoWindowClose(){
//     this.setState({
//       isOpen: false
//     });
//   }


//   render() {
//     return <InfoWindow onClose={this.infoWindowClose.bind(this)} ref={this.infoWindowRef} {...this.props} />;
//   }
// }