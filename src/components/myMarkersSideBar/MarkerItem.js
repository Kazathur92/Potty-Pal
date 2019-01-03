import React, { Component } from 'react'
import { Button, Modal, Icon, Card, Container } from "react-bulma-components/full";
import Radium, { StyleRoot } from 'radium';
import StarRatingComponent from 'react-star-rating-component';
import { slideInDown, rotateIn, flipInX, headShake, fadeIn, flipInY, slideInRight } from 'react-animations'
import './MyMarkersSideBar.css'

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
//==========================================================================



export default class MarkerItem extends Component {

state = {

}



deleteIt = (id) => {

  this.props.warningMessageToggleSideBar(id)

}



render() {

  return(
<div className="">
  <Card className="markerCard" onMouseOver={() => this.props.handleIconState_1(this.props.markerProperties, this.props.marker.id)}
  onMouseLeave={() => this.props.handleIconState_2(this.props.markerProperties, this.props.marker.id)}
  >
  {/* <Button id={`button_${this.props.marker.id}`} className="closeButton">x</Button> */}
<p>{this.props.marker.name}</p>
<p>{this.props.marker.location}</p>
<p><Icon className="fas fa-baby" color="info"></Icon>
&nbsp;{this.props.changingStation}</p>
<p><Icon className="fas fa-wheelchair" color="info"></Icon>
&nbsp;{this.props.handicapAccess}</p>
<StarRatingComponent
            name="rate5"
            starCount={5}
            value={this.props.markerProperties.rating}
            // value={this.props.currentMarker.rating}
          />
<Card.Footer>
        <Card.Footer.Item renderAs="a" type="button"
        // onClick={this.props.handleInfoWindowContentState_1}
        onClick={this.props.handleSidebarEditState}
        >
          Edit
        </Card.Footer.Item>
        <Card.Footer.Item renderAs="a" type="button" onClick={() => this.deleteIt(this.props.marker.id)}>
          Delete
        </Card.Footer.Item >
      </Card.Footer>
</Card>
</div>

  )
}
}