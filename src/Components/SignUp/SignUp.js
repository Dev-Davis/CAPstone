import React from 'react';
// import firebase from 'firebase/app';
import 'firebase/auth';

import { Link } from 'react-router-dom';

import { Form } from 'react-bootstrap';

class Auth extends React.Component {

  newUser = () => {

  }

  render() {
    const SignUpLink = '/signup';
    return (
      <div className="Auth text-center">
        <h1 className="loginAuth">HatFish</h1>
        <h5 className="loginAuth">"There's nothing to hide"</h5>
        <Form className="col-4 offset-4">
          <Form.Group controlId="formGroupEmail">
            <Form.Label>Choose and Email address</Form.Label>
            <Form.Control type="email" placeholder="Enter email" />
          </Form.Group>
          <Form.Group controlId="formGroupPassword">
            <Form.Label>Choose a Password</Form.Label>
            <Form.Control type="password" placeholder="Password" />
          </Form.Group>
        </Form>
        <Link className="btn btn-dark" to={SignUpLink} onClick={this.newUser}>SignUp</Link>
      </div>
    );
  }
}

export default Auth;
