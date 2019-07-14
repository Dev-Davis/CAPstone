import React from 'react';

import hatShape from '../../helpers/propz/hatShapes';

class HatsCard extends React.Component {
  static propTypes = {
    hats: hatShape.hatShape,
  }

  render() {
    const { hats } = this.props;
    console.error(hats);
    return (
      <div className="StuffCard col-4">
      <div className="card-body">
        <p className="card-title text-center">Name</p>
        <h3 className="card-title text-center">{hats.name}</h3>
        <p className="card-title text-center">Type</p>
        <h3 className="card-title text-center">{hats.type}</h3>
        <p className="card-title text-center">Color Way</p>
        <h3 className="card-title text-center">{hats.colorWay}</h3>
      </div>
    </div>
    );
  }
}

export default HatsCard;
