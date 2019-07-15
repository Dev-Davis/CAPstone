import React from 'react';


import hatShape from '../../helpers/propz/hatShapes';

class HatsCard extends React.Component {
  static propTypes = {
    hats: hatShape.hatShapes,
  }

  render() {
    const { hats } = this.props;
    return (
      <div className="card" style={{ width: 362 }}>
        <img src={hats.imageUrl} className="card-img-top" alt="Pic of a hat" />
        <div className="StuffCard col-10 offset-1">
            <div className="card-body">
              <p className="card-title text-center">Name</p>
              <h3 className="card-title text-center">{hats.name}</h3>
              <p className="card-title text-center">Type</p>
              <h3 className="card-title text-center">{hats.type}</h3>
              <p className="card-title text-center">Color Way</p>
              <h3 className="card-title text-center">{hats.colorWay}</h3>
            </div>
          </div>
        </div>
    );
  }
}

export default HatsCard;
