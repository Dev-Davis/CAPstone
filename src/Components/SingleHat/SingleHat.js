import React from 'react';
import { Link } from 'react-router-dom';
import firebase from 'firebase/app';
import 'firebase/auth';
import moment from 'moment';

import profileData from '../../helpers/data/profileData';
import commentData from '../../helpers/data/commentData';
import CommentCard from '../Comments/Comments';

import commentShapes from '../../helpers/propz/commentShapes';

const  newCommentInfo = {
  username: '',
  comment: '',
  date: '',
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

  usernameChange = e => this.stringStateField('username', e);
  commentChange = e => {this.stringStateField('comment', e);}

  // This is where you assign comments to certain hats
  getComments = (hatId) => {
    commentData.getCommentByHatId(hatId)
      .then(comments => this.setState({comments}))
      .catch(err => console.error('could not get comments', err));
  }
  singleHat = () => {
    const profileHatId = this.props.match.params.id;
    profileData.getSingleProfileHat(profileHatId)
    .then(profileHatPromise => this.setState({ profileHats: profileHatPromise.data }))
    .catch(err => console.error('no single hat elements', err));
  }
  
  submitComment = (e) => {
    e.preventDefault();
    const hatId = this.props.match.params.id;
    const saveComment = { ...this.state.newComment };
    const date = moment().calendar();
    saveComment.uid = firebase.auth().currentUser.uid;
    saveComment.hatId = this.props.match.params.id;
    saveComment.date = date;
    commentData.postNewComment(saveComment)
    .then(() => this.getComments(hatId))
     // To clear the form after submission
     this.setState({ 
      username: '',
      comment: '',
    })
  }
  
  componentDidMount() {
    const profileHatId = this.props.match.params.id;
    this.getComments(profileHatId);
    this.singleHat();
  }

  editComment = (e) => {
    // console.log('edit button', e);
    const commentId = this.state.comments.id;
    commentData.getSingleComment(commentId)
      .then(commentPromise => this.setState({ stuff: commentPromise.data }))
      .catch(err => console.error('can not get comment', err));
  }

  updateComment = (e) => {
    console.log('update button', e);
  }

  // Passing the comment card and the function into the render
  render() {
    const { profileHats } = this.state;
    const profileLink = `/profile`;
    const makeComments = this.state.comments.map(comment => (
      <CommentCard
        key={comment.id}
        comment={comment}
        editComment={this.editComment}
      />
    ));
    
    return (
      <div className="singlePage col-4 offset-4">
      <div className="card">
          <div className="card-header"></div>
          <h1>{profileHats.name}</h1>
          </div>
          <div className="card-body">
            <img src={profileHats.imageUrl} className="card-img-top" alt="Pic of a hat" />
            <h5 className="card-title">{profileHats.description}</h5>
            <Link className="btn btn-dark" to={profileLink}>Back To Profile</Link>
          </div>
          <div className="commentForm">
            <form className="#">
              <div className="form-group">
                <label htmlFor="username">Username</label>
                <input
                name="username"
                type="text"
                className="form-control"
                ref="username"
                placeholder="username"
                value={this.state.username}
                onChange={this.usernameChange}/>
              </div>
              <div className="form-group">
                <label htmlFor="comment">Comment</label>
                <input
                name="comment"
                type="text"
                className="form-control"
                ref="comment"
                placeholder="Your comment..."
                value={this.state.comment}
                onChange={this.commentChange}/>
              </div>
              <div className="commentForm">
                <button type="submit" className="btn btn-primary" onClick={this.submitComment}>Comment</button>
              </div>
            </form>
          </div>
            {makeComments}
        </div>
    )
  }
}
export default Single;
