import React, { Component } from 'react'
import { FirebaseContext } from '../firebase/FirebaseContext';

// const TEST = () => (
//   <FirebaseContext.Consumer>
//   {firebase => {
//     return <div>I've access to Firebase and render something.</div>;
//   }}
//   </FirebaseContext.Consumer>
// )

// export default TEST

export default class TEST extends Component {




render(){
  return(
    <FirebaseContext.Consumer>
    {firebase => {
     console.log(firebase);
    }}
    </FirebaseContext.Consumer>
  )
}


}