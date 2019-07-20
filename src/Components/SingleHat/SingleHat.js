import React from 'react';
import { Link } from 'react-router-dom';
import 'firebase/auth';

import profileData from '../../helpers/data/profileData';
import commentData from '../../helpers/data/commentData';
import CommentCard from '../Comments/Comments';

import commentShapes from '../../helpers/propz/commentShapes';

const  newCommentInfo = {
  userName: '',
  comment: '',
}

class Single extends React.Component {
  state = {
    profileHats: {},
    comments: [],
    newComment: newCommentInfo,
  }

  static propTypes = {
    comments: commentShapes.commentShapes,
  }

  stringStateField = (name, e) => {
    const copyComment = { ...this.state.newComment };
    copyComment[name] = e.target.value;
    this.setState({ newComment: copyComment });
  }

  userNameChange = e => this.stringStateField('userName', e);
  commentChange = e => {
    this.stringStateField('comment', e);
  }


  getComments = (hatId) => {
    commentData.getCommentByHatId(hatId)
      .then(comments => this.setState({comments}))
      .catch(err => console.error('could not get comments', err));
  }

  makeNewComment = (hatId) => {
    commentData.makeCommentsByHatId(hatId)
    .then(comments => this.setState({comments}))
    .catch(err => console.error('could not post comment', err));
  }

  singleHat = () => {
    const profileHatId = this.props.match.params.id;
    profileData.getSingleProfileHat(profileHatId)
    .then(profileHatPromise => this.setState({ profileHats: profileHatPromise.data }))
    .catch(err => console.error('no single hat elements', err));
  }

  componentDidMount() {
    const profileHatId = this.props.match.params.id;
    this.getComments(profileHatId);
    this.singleHat();
  }

    submitComment = (e) => {
      e.preventDefault();

  }

  
  render() {
    const { profileHats } = this.state;
    const profileLink = `/profile`;
    const makeComments = this.state.comments.map(comment => (
      <CommentCard
        key={comment.id}
        comment={comment}
      />
    ));
    const { newComment } = this.state;
    
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
          <div className="commentArea">
            <form className="#" onSubmit={this.submitComment}>
              <div className="form-group">
                <label htmlFor="userName">Username</label>
                <input
                type="text"
                className="form-control"
                id="userName"
                placeholder="Adam B"
                value={newComment.userName}
                onChange={this.userNameChange}/>
              </div>
              <div className="form-group">
                <label htmlFor="comment">Comment</label>
                <input
                type="text"
                className="form-control"
                id="comment"
                placeholder="That hat is wicked!"
                value={newComment.comment}
                onChange={this.commentChange}/>
              </div>
              <button type="submit" className="btn btn-primary">Submit</button>
            </form>
          </div>
            {makeComments}
          </div>
        </div>
    )
  }
}
export default Single;