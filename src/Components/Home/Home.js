import React from 'react';

import HatsCard from '../HatsCard/HatsCard';

import hatData from '../../helpers/data/hatData';

import './Home.scss';

class Home extends React.Component {
  state = {
    hats: [],
  }

  getHats = () => {
    hatData.getMyHats()
      .then(hats => this.setState({hats}))
      .catch(err => console.error('could not get hats for home', err));
  }


  componentDidMount() {
    this.getHats();
  }

  deleteHat = (hatId) => {
    hatData.removeHat(hatId)
      .then(() => this.getHats())
      .catch(err => console.error('unable to delete the hat', err));
  }

  render() {
    const makeHatCards = this.state.hats.map(hat => (
      <HatsCard
        key={hat.id}
        hats={hat}
      />
    ));

    return (
      <div className="Home col">
        <h1 className="header-title">Home</h1>
        <div className="d-flex flex-wrap">
          {makeHatCards}
        </div>
      </div>
    );
  }
}

export default Home;
