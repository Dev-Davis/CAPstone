import React from 'react';

// import HatsCard from '../HatsCard/HatsCard';

import hatData from '../../helpers/data/hatData';

import './Home.scss';

class Home extends React.Component {
  state = {
    hats: [],
  }

  getHats = () => {
    hatData.getHats()
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
    // const makeHatCards = this.state.hats.map(hat => (
    //   <HatsCard
    //     key={hat.id}
    //     hats={hat}
    //     deleteHat={this.deleteHat}
    //   />
    // ));

    return (
      <div className="Home col-12">
        <h1 className="header-title">CAPstone</h1>
          <div>Let's turn this house into a hatty home!</div>
        <div className="d-flex flex-wrap">
          <div className="intro-bar">We have Snapbacks, Dad Hats, Beanies, and Trucker Hats</div>
        </div>
      </div>
    );
  }
}

export default Home;
