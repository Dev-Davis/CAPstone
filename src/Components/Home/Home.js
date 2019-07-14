import React from 'react';
import firebase from 'firebase/app';
// import { Link } from 'react-router-dom';

import hatData from '../../helpers/data/hatData';
import HatsCard from '../HatsCard/HatsCard';

import './Home.scss';

class Home extends React.Component {
  state = {
    hats: [],
  }

  getHats = () => {
    const { uid } = firebase.auth().currentUser;
    hatData.getHats(uid)
      .then(hats => this.setState({ hats }))
      .catch(err => console.error('could not get hats to Home', err));
  }

  componentDidMount = () => {
    this.getHats();
  }

  render() {
    const makeCards = this.state.hats.map(hat => (
      <HatsCard
        key={hat.id}
        hat={hat}
        />
        ))
        console.error(makeCards);
    return (
      <div className="Home col">
        <h1 className="header-title">Home</h1>
        <div className="home-box">
          {makeCards}
        </div>
      </div>
    );
  }
}

export default Home;
