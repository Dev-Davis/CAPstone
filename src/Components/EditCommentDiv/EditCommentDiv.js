import React from 'react';
import { Button, Modal, ModalHeader, ModalBody, ModalFooter } from 'reactstrap';

import PropTypes from 'prop-types';

// import commentData from '../../helpers/data/commentData';

import commentShapes from '../../helpers/propz/commentShapes';
// import commentData from '../../helpers/data/commentData';

class EditCommentDiv extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      modal: false,
      comment: ''
    };
    this.toggle = this.toggle.bind(this);
  }

  static propTypes = {
    comment: commentShapes.commentShapes,
    updateComment: PropTypes.func.isRequired,
  }

  toggle() {
    this.setState(prevState => ({
      modal: !prevState.modal
    }));
  }

  // Important part of update in modal
  updateComment = (e) => {
    e.preventDefault();
    const { updateComment } = this.props;
    const saveComment = this.state.comment;
    const commentId = this.props.comment.commentId;
    const editedCommentIsh = {...this.props.comment};
    editedCommentIsh.comment = saveComment;
    updateComment(editedCommentIsh, commentId)
    this.toggle();
  }

  commentChange = (e) => {
    e.preventDefault();
    this.setState({ comment: e.target.value })
  }

  render() {
    return (
      <div>
        <Button color="info" onClick={this.toggle}>Edit</Button>
        <Modal isOpen={this.state.modal} fade={false} toggle={this.toggle} className={this.props.className}>
          <ModalHeader toggle={this.toggle}>Edit Comment</ModalHeader>
          <ModalBody>
          <form className="#">
              <div className="form-group">
                <label htmlFor="comment">Comment</label>
                <input
                name="comment"
                type="text"
                className="form-control"
                ref="comment"
                placeholder="Your comment..."
                defaultValue={this.props.comment.comment}
                onChange={this.commentChange}/>
              </div>
              <div className="commentForm">
              </div>
            </form>
          </ModalBody>
          <ModalFooter>
            <Button color="primary" onClick={this.updateComment}>Update</Button>{' '}
            <Button color="secondary" onClick={this.toggle}>Cancel</Button>
          </ModalFooter>
        </Modal>
      </div>
    );
  }
}

export default EditCommentDiv;
