import React from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';

import hatShape from '../../helpers/propz/hatShapes';

class ProfileHatsCard extends React.Component {
  static propTypes = {
    hats: hatShape.hatShapes,
    deleteHat: PropTypes.func.isRequired,
  }

  deleteHat = (e) => {
    e.preventDefault();
    const { hats, deleteHat } = this.props;
    deleteHat(hats.id);
  }

  render() {
    const { hats } = this.props;
    const editLink = `edit/${hats.id}`;
    const singleLink = `single/${hats.id}`
    return (
      <div className="card col-3" style={{ width: 600 }}>
        {/* <Link to={...}></Link> */}
        <div className="StuffCard col-10 offset-1">
            <div className="card-body">
              <Link to={singleLink}><img src={hats.imageUrl} className="card-img-top" alt="Pic of a hat" /></Link>
              <h3 className="card-title">{hats.name}</h3>
              <p className="card-text">{hats.type}</p>
              <h5 className="card-text">{hats.colorWay}</h5>
              <Link className="btn btn-warning" to={editLink}>Edit</Link>
              <button className="btn btn-danger" onClick={this.deleteHat}>Delete</button>
            </div>
          </div>
        </div>
    );
  }
}

export default ProfileHatsCard;
