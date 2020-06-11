import React from 'react';
// import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';

import hatShape from '../../helpers/propz/hatShapes';

class HatsCard extends React.Component {
  static propTypes = {
    hats: hatShape.hatShapes,
    deleteHat: PropTypes.func.isRequired,
  }

  deleteMe = (e) => {
    e.preventDefault();
    const { hats, deleteHat } = this.props;
    deleteHat(hats.id);
  }

  render() {
    const { hats } = this.props;
    const singleLink = `single/${hats.id}`
    return (
      <div className="card" ref={hats.id} style={{ width: 300 }}>
       {/* <img src={hats.imageUrl} className="card-img-top" alt="Pic of a hat" /> */}
        <div className="HatCard">
            <div className="card-body">
              <h3 className="card-title text-center">{hats.name}</h3>
              <h5 className="card-title text-center">{hats.type}</h5>
              <h5 className="card-title text-center">{hats.colorWay}</h5>
            </div>
          </div>
        </div>
    );
  }
}

export default HatsCard;
