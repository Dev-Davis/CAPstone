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
    const { comments } = this.props;
    const commentId = this.props.comment.id;
    console.error(comments);
    return (
      <div>
        <div class="card w-95" ref={commentId}>
          <div class="card-body">
            <h5 class="card-title">{this.props.comment.leftBy}</h5>
            <p class="card-text">{this.props.comment.comment}</p>
            <p class="card-text">{this.props.comment.date}</p>
          </div>
        </div>
      </div>
    );
  }
}

export default CommentCard;
