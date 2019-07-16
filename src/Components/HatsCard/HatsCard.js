import React from 'react';
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
    return (
      <div className="card col-2" style={{ width: 362 }}>
        <img src={hats.imageUrl} className="card-img-top" alt="Pic of a hat" />
        <div className="StuffCard col-10 offset-1">
            <div className="card-body">
              <h5 className="card-title text-center">{hats.name}</h5>
              <h5 className="card-title text-center">{hats.type}</h5>
              <h5 className="card-title text-center">{hats.colorWay}</h5>
              <button className="btn btn-danger" onClick={this.deleteMe}>Delete</button>
            </div>
          </div>
        </div>
    );
  }
}

export default HatsCard;
