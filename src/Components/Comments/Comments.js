import React from 'react';
import PropTypes from 'prop-types';

import EditCommentDiv from '../EditCommentDiv/EditCommentDiv';

import commentShapes from '../../helpers/propz/commentShapes';

class CommentCard extends React.Component {
  static propTypes = {
    comment: commentShapes.commentShapes,
    updateComment: PropTypes.func.isRequired,
  }

  // editComment = (e) => {
  //   e.preventDefault();
  //   const { comment, editComment } = this.props;
  //   editComment(comment.id);
  // }

  render() {
    return (
      <div>
        <div className="card w-95">
          <div className="card-body">
            <h4 className="card-title">{this.props.comment.username}</h4>
            <h5 className="card-text">{this.props.comment.comment}</h5>
            <p className="card-text">{this.props.comment.date}</p>
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