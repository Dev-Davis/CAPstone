import React from 'react';
import PropTypes from 'prop-types';

import EditCommentDiv from '../EditCommentDiv/EditCommentDiv';

import commentShapes from '../../helpers/propz/commentShapes';

import './Comments';

class CommentCard extends React.Component {
  static propTypes = {
    comment: commentShapes.commentShapes,
    updateComment: PropTypes.func.isRequired,
    removeComment: PropTypes.func.isRequired,
  }

 deleteComment = (e) => {
   e.preventDefault();
   const { comment, removeComment } = this.props;
   removeComment(comment.id);
 }

  render() {
    return (
      <div>
        <div className="card w-99">
          <div className="card-body">
            <h4 className="card-title">{this.props.comment.username}</h4>
            <h5 className="card-text">{this.props.comment.comment}</h5>
            <p className="card-text">{this.props.comment.date}</p>
            <button type="submit" className="btn btn-danger" onClick={this.deleteComment}>Delete</button>
            <EditCommentDiv
            comment={this.props.comment}
            updateComment= {this.props.updateComment}
            />
          </div>
        </div>
      </div>
    );
  }
}

export default CommentCard;