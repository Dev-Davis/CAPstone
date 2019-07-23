import React from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';

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
    const commentId = this.props.comment.id;
    const singleLink = '/single/:id';
    return (
      <div>
        <div className="card w-95" ref={commentId}>
          <div className="card-body">
            <h4 className="card-title">{this.props.comment.username}</h4>
            <h5 className="card-text">{this.props.comment.comment}</h5>
            <p className="card-text">{this.props.comment.date}</p>
            <Link className="btn btn-warning" onClick={this.editComment} to={singleLink}>Edit</Link>
          </div>
        </div>
      </div>
    );
  }
}

export default CommentCard;