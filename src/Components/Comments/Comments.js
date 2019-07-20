import React from 'react';
// import { Link } from 'react-router-dom';u
// import PropTypes from 'prop-types';

import commentShapes from '../../helpers/propz/commentShapes';

class CommentCard extends React.Component {
  state = {
    comments: [],
  }

  static propTypes = {
    comments: commentShapes.commentShapes,
  }

  render() {
    const commentId = this.props.comment.id;
    return (
      <div>
        <div className="card w-95" ref={commentId}>
          <div className="card-body">
            <h5 className="card-title">{this.props.comment.username}</h5>
            <p className="card-text">{this.props.comment.comment}</p>
            <p className="card-text">{this.props.comment.date}</p>
          </div>
        </div>
      </div>
    );
  }
}

export default CommentCard;