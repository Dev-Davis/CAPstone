import React from 'react';

import profileData from '../../helpers/data/profileData';
class Single extends React.Component {
  state = {
    profileHats: {},
  }

  componentDidMount() {
    const profileHatId = this.props.match.params.id;
    profileData.getSingleProfileHat(profileHatId)
    .then(profileHatPromise => this.setState({ profileHats: profileHatPromise.data }))
      // .then(hatPromise => console.error(hatPromise))
      .catch(err => console.error('no single hat elements', err));
  }

  render() {
    const { profileHats } = this.state;
    console.error(profileHats);
    return (
      <div className="singlePage col-4 offset-4">
      <h1>Single Page</h1>
      <div className="card">
          <div className="card-header">
          <h1>{profileHats.name}</h1>
          </div>
          <div className="card-body">
            <img src={profileHats.imageUrl} className="card-img-top" alt="Pic of a hat" />
            <h5 className="card-title">{profileHats.description}</h5>
            <h4 className="card-text">Comments</h4>
            <div className="form-group">
            <label htmlFor="stuffCategory">Category of Stuff</label>
            <input
              type="textarea"
              col={50}
              row={4}
              className="form-control"
              id="comment"
              placeholder="Type comment here ..."
              // value={profileHats.type}
              // onChange={this.categoryChange}
            />
            <button type="submit" className="btn btn-primary">Comment</button>
            <small id="stuffCategory" className="form-text text-muted">Make sure everything is correct before submitting.</small>
          </div>
          </div>
        </div>
    </div>
    )
  }
}
export default Single;