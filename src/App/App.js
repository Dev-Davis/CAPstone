import React from 'react';
import {
  BrowserRouter,
  Route,
  Redirect,
  Switch,
} from 'react-router-dom';
import './App.scss';

import firebase from 'firebase/app';
import 'firebase/auth';

import HatNav from '../Components/HatNav/HatNav';
import Auth from '../Components/Auth/Auth';
import Home from '../Components/Home/Home';
import Profile from '../Components/MyProfile/MyProfile';
import SingleHat from '../Components/SingleHat/SingleHat';
import EditHat from '../Components/EditHat/EditHat';
import SignUp from '../Components/SignUp/SignUp';

import connection from '../helpers/connection';

connection();

const PublicRoute = ({ component: Component, authed, ...rest }) => {
  const routeChecker = props => (authed === false
    ? (<Component {...props} />)
    : (<Redirect to={{ pathname: '/profile', state: { from: props.location } }}/>)
  );
  return <Route {...rest} render={props => routeChecker(props)} />;
};

const PrivateRoute = ({ component: Component, authed, ...rest }) => {
  const routeChecker = props => (authed === true
    ? (<Component {...props} />)
    : (<Redirect to={{ pathname: '/auth', state: { from: props.location } }}/>)
  );
  return <Route {...rest} render={props => routeChecker(props)} />;
};

class App extends React.Component {
  state = {
    authed: false,
  }

  componentDidMount() {
    this.removeListener = firebase.auth().onAuthStateChanged((user) => {
      if (user) {
        this.setState({ authed: true });
      } else {
        this.setState({ authed: false });
      }
    });
  }

  componentWillUnmount() {
    this.removeListener();
  }

  render() {
    const { authed } = this.state;
    return (
      <div className="App">
        <BrowserRouter>
          <React.Fragment>
            <HatNav authed={authed} />
                <Switch>
                  <PublicRoute path='/auth' component={Auth} authed={authed} />
                  <PrivateRoute path='/home' component={Home} authed={authed} />
                  <PrivateRoute path='/edit/:id' component={EditHat} authed={authed} />
                  <PrivateRoute path='/single/:id' component={SingleHat} authed={authed} />
                  <PrivateRoute path='/profile' component={Profile} authed={authed} />
                  <PrivateRoute path='/signup' component={SignUp} authed={authed} />
                  <Redirect from="*" to="/auth" />
                </Switch>
          </React.Fragment>
        </BrowserRouter>
      </div>
    );
  }
}

export default App;