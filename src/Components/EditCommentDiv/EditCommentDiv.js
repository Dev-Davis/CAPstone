/* eslint react/no-multi-comp: 0, react/prop-types: 0 */

import React from 'react';
import { Button, Modal, ModalHeader, ModalBody, ModalFooter } from 'reactstrap';

class EditForm extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      modal: false
    };

    this.toggle = this.toggle.bind(this);
  }

  toggle() {
    this.setState(prevState => ({
      modal: !prevState.modal
    }));
  }

  updateComment = (e) => {
    e.preventDefault();
    console.error('hi');
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
                {/* <button type="submit" className="btn btn-primary" onClick={this.submitComment}>Comment</button> */}
              </div>
            </form>
          </ModalBody>
          <ModalFooter>
            <Button color="primary" onClick={this.updateComment}>Update</Button>{' '}
            <Button color="secondary" onClick={this.toggle}  onSubmit={this.toggle}>Cancel</Button>
          </ModalFooter>
        </Modal>
      </div>
    );
  }
}

export default EditForm;