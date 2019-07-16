import React from 'react';
import { Link } from 'react-router-dom';

import hatShape from '../../helpers/propz/hatShapes';

class ProfileHatsCard extends React.Component {
  static propTypes = {
    hats: hatShape.hatShapes,
  }

  render() {
    const { hats } = this.props;
    const editLink = `edit/${hats.id}`;
    return (
      <div className="card col-3" style={{ width: 600 }}>
        {/* <Link to={...}></Link> */}
        <div className="StuffCard col-10 offset-1">
            <div className="card-body">
              <h3 className="card-title">{hats.name}</h3>
              <img src={hats.imageUrl} className="card-img-top" alt="Pic of a hat" />
              <p className="card-text">{hats.type}</p>
              <h5 className="card-text">{hats.colorWay}</h5>
              <Link className="btn btn-warning" to={editLink}>Edit</Link>
            </div>
          </div>
        </div>
    );
  }
}

export default ProfileHatsCard;
