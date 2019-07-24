import React from 'react';
import PropTypes from 'prop-types';

import EditCommentDiv from '../EditCommentDiv/EditCommentDiv';

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

  render() {
    return (
      <div>
        <div className="card w-95">
          <div className="card-body">
            <h5 className="card-title">{this.props.comment.username}</h5>
            <p className="card-text">{this.props.comment.comment}</p>
            <p className="card-text">{this.props.comment.date}</p>
            <EditCommentDiv
            comment={this.props.comment}
            />
          </div>
        </div>
      </div>
    );
  }
}

export default CommentCard;