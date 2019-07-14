import React from 'react';
// import { Link } from 'react-router-dom';

import './Home.scss';

class Home extends React.Component {
  editEvent = (e) => {
    e.preventDefault();
    this.props.history.push(`/single`);
  };

  render() {
    return (
      <div className="Home col">
        <h1 className="header-title">Home</h1>
        <div className="home-box">
        </div>
      </div>
    );
  }
}

export default Home;
