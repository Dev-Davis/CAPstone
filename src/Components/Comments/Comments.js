import React from 'react';
// import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';

import EditForm from '../EditCommentDiv/EditCommentDiv';

import commentShapes from '../../helpers/propz/commentShapes';

class CommentCard extends React.Component {
  static propTypes = {
    comments: commentShapes.commentShapes,
    editComment: PropTypes.func.isRequired,
  }

  editComment = (e) => {
    e.preventDefault();
    const { comment, editComment } = this.props;
    editComment(comment.id);
  }

  updateComment = (commentId, updateComment) => {
    console.log(commentId, updateComment);
  }

  render() {
    const commentId = this.props.comment.id;
    // const singleLink = '/single/:id';
    return (
      <div>
        <div className="card w-95 editIt" ref={commentId}>
          <div className="card-body">
            <h5 className="card-title">{this.props.comment.username}</h5>
            <p className="card-text">{this.props.comment.comment}</p>
            <p className="card-text">{this.props.comment.date}</p>
            <div>
              <EditForm 
              comment={this.props.comment}
              />
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default CommentCard;