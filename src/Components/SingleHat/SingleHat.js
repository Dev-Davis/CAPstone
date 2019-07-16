import React from 'react';

import hatData from '../../helpers/data/hatData';

class Single extends React.Component {
  state = {
    hats: {},
  }

  componentDidMount() {
    const hatId = this.props.match.params.id;
    hatData.getSingleHat(hatId)
      // .then(hatPromise => console.error(hatPromise))
      .then(hatPromise => this.setState({ hats: hatPromise.data }))
      .catch(err => console.error('no single hat elements', err));
  }

  render() {
    const { hats } = this.state;
    return (
      <div className="singlePage col-4 offset-4">
      <h1>Single Page</h1>
      <div className="card">
          <div className="card-header">
          <h1>{hats.name}</h1>
          </div>
          <div className="card-body">
            <img src={hats.imageUrl} className="card-img-top" alt="Pic of a hat" />
            <h5 className="card-title">{hats.description}</h5>
            <h4 className="card-text">Comments</h4>
            <h4 className="card-text">...</h4>
            <h4 className="card-text">...</h4>
            <h4 className="card-text">...</h4>
            <h4 className="card-text">...</h4>
          </div>
        </div>
    </div>
    )
  }
}
export default Single;
