import React from 'react';
import firebase from 'firebase/app';
// import { Link } from 'react-router-dom';

import ProfileHatsCard from '../ProfileHatCard/ProfileHatCard';

import hatData from '../../helpers/data/hatData';

import './MyProfile.scss';

class Home extends React.Component {
  state = {
    hats: [],
  }

  getHats = () => {
    const { uid } = firebase.auth().currentUser;
    hatData.getHats(uid)
      .then(hats => this.setState({hats}))
      .catch(err => console.error('could not get hats for home', err));
  }


  componentDidMount() {
    this.getHats();
  }

  render() {
    const makeHatCards = this.state.hats.map(hat => (
      <ProfileHatsCard
        key={hat.id}
        hats={hat}
      />
    ));

    return (
      <div className="Home col">
        <h1 className="header-title">Profile Page</h1>
          <div className="profile-pic">
            <img src="..." alt="..." />
          </div>
          <div className="d-flex flex-wrap">
            {makeHatCards}
          </div>
      </div>
    );
  }
}

export default Home;

