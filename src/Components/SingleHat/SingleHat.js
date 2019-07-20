import React from 'react';
import { Link } from 'react-router-dom';
// import firebase from 'firebase/app';
import 'firebase/auth';

import profileData from '../../helpers/data/profileData';
import commentData from '../../helpers/data/commentData';
import CommentCard from '../Comments/Comments';

import commentShapes from '../../helpers/propz/commentShapes';
class Single extends React.Component {
  state = {
    profileHats: {},
    comments: [],
  }

  static propTypes = {
    comments: commentShapes.commentShapes,
  }

  getComments = (hatId) => {
    commentData.getCommentByHatId(hatId)
      .then(comments => this.setState({comments}))
      .catch(err => console.error('could not get comments', err));
  }

  singleHat = () => {
    const profileHatId = this.props.match.params.id;
    profileData.getSingleProfileHat(profileHatId)
    .then(profileHatPromise => this.setState({ profileHats: profileHatPromise.data }))
      // .then(hatPromise => console.error(hatPromise))
    .catch(err => console.error('no single hat elements', err));
  }

  componentDidMount() {
    const profileHatId = this.props.match.params.id;
    this.getComments(profileHatId);
    this.singleHat();
  }

    submitComment = (e) => {
      e.preventDefault();
      console.error('you left a comment');
  }

  
  render() {
    // const i = this.props.hats.findIndex(hat => )
    const { profileHats } = this.state;
    const profileLink = `/profile`;
    const makeComments = this.state.comments.map(comment => (
      <CommentCard
        key={comment.id}
        comment={comment}
      />
    ));    
    
    return (
      <div className="singlePage">
      <div className="card">
          <div className="card-header">
          <h1>{profileHats.name}</h1>
          </div>
          <div className="card-body">
            <img src={profileHats.imageUrl} className="card-img-top" alt="Pic of a hat" />
            <h5 className="card-title">{profileHats.description}</h5>
            <Link className="btn btn-dark" to={profileLink}>Back To Profile</Link>
          </div>
            {makeComments}
          </div>
        </div>
    )
  }
}
export default Single;