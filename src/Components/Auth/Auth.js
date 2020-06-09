import React from 'react';
import firebase from 'firebase/app';
import 'firebase/auth';

// import { Form } from 'react-bootstrap';

import './Auth.scss';

class Auth extends React.Component {
  loginClickEvent = (e) => {
    e.preventDefault();
    const provider = new firebase.auth.GoogleAuthProvider();
    firebase.auth().signInWithPopup(provider);
  };

  render() {
    return (
      <div className="Auth col-10 offset-1">
        {/* <h1 className="loginAuth">HatFish</h1> */}
        {/* <h5 className="loginAuth">"There's nothing to hide"</h5> */}
        <h1 className="loginAuth">CAPstone</h1>
        <h5 className="loginAuth">"Hats Collector's World"</h5>
        <button className="btn btn-primary" onClick={this.loginClickEvent}>Log In!</button>
      </div>
    );
  }
}

export default Auth;
