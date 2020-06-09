import React from "react";
import firebase from "firebase/app";

import ProfileHatsCard from "../ProfileHatCard/ProfileHatCard";

import hatData from "../../helpers/data/hatData";

import userShapes from '../../helpers/propz/userShapes';

import "./MyProfile.scss";

// sets the hat info to blank as default

const defaultHatInfo = {
  name: '',
  type: '',
  colorWay: '',
  description: '',
  imageUrl: ''
};

class Home extends React.Component {
  state = {
    hats: [],
    newHat: defaultHatInfo
  };

  static propTypes = {
    users: userShapes.userShapes,
  }

  /* Changes the state for the strings in each category
  for adding them to the page */

  stringStateField = (name, e) => {
    const copyHats = { ...this.state.newHat };
    copyHats[name] = e.target.value;
    this.setState({ newHat: copyHats });
  };

  imageChange = e => this.stringStateField('imageUrl', e);
  nameChange = e => this.stringStateField('name', e);
  typeChange = e => this.stringStateField('type', e);
  colorWayChange = e => this.stringStateField('colorWay', e);
  descriptionChange = e => this.stringStateField('description', e);


  getHats = () => {
    const { uid } = firebase.auth().currentUser;
    hatData
      .getHats(uid)
      .then(hats => this.setState({ hats }))
      .catch(err => console.error("could not get hats for home", err));
  };

  componentDidMount() {
    this.getHats();
  }

  submitForm = e => {
    e.preventDefault();
    const saveHat = { ...this.state.newHat };
    saveHat.uid = firebase.auth().currentUser.uid;
    hatData
      .postNewHat(saveHat)
      .then(() => this.getHats())
    // .catch(err => console.error("unable to post new hat", err));
    this.setState({
      newHat: defaultHatInfo
    })
  };

  deleteHat = hatId => {
    hatData
      .removeHat(hatId)
      .then(() => this.getHats())
      .catch(err => console.error("unable to delete the hat", err));
  };

  handleUploadSuccess = filename => {
    this.setState({ avatar: filename, progress: 100, isUploading: false });
    firebase
      .storage()
      .ref("images")
      .child(filename)
      .getDownloadURL()
      .then(url => this.setState({ avatarURL: url }));
  };

  render() {
    // const { newHat } = this.state;
    const makeHatCards = this.state.hats.map(hat => (
      <ProfileHatsCard key={hat.id} hats={hat} deleteHat={this.deleteHat} />
    ));

    return (
      <div className="#">
        <div className="container">
          <div class="row">
            <div class="col-6 pic-name">
              <h3 class="text-center">Sean Davis</h3>
              <img src="https://i.ibb.co/2ccRgrh/WW-hat.jpg" alt="profile-pic" border="0" className="profilePhoto text-center"/>
            </div>
            <form className="col-6 hat-info" onSubmit={this.submitForm}>
              <div className="uploadTitle">
                Add a hat...
            </div>
              <div className="form-group">
                <label htmlFor="hatName">Name</label>
                <input
                  type="text"
                  className="form-control"
                  id="hatName"
                  placeholder="Hat Name"
                  value={this.state.newHat.name}
                  onChange={this.nameChange}
                />
              </div>
              <div className="form-group">
                <label htmlFor="hatType">Type</label>
                <input
                  type="text"
                  className="form-control"
                  id="hatType"
                  placeholder="Hat Type"
                  value={this.state.newHat.type}
                  onChange={this.typeChange}
                />
              </div>
              <div className="form-group">
                <label htmlFor="hatColorWay">Color</label>
                <input
                  type="text"
                  className="form-control"
                  id="hatColorWay"
                  placeholder="Hat Color"
                  value={this.state.newHat.colorWay}
                  onChange={this.colorWayChange}
                />
              </div>
              <div className="form-group">
                <label htmlFor="hatDescription">Description</label>
                <input
                  type="textarea"
                  className="form-control"
                  id="hatDescription"
                  placeholder="Hat Description"
                  value={this.state.newHat.description}
                  onChange={this.descriptionChange}
                />
              </div>
              <button type="submit" className="btn btn-primary">
                Submit
              </button>
            </form>
          </div>
        </div>
        <div className="aboutSection text-center col-4 offset-4">
          <span className="aboutMe">About my hats</span>
          <br />
          Hat lover | Snapbacks | Dad hats | #hatstravaganza
        </div>
        <div className="container">
          <div className="d-flex flex-wrap profileCards">
            {makeHatCards}
          </div>
        </div>
      </div>
    );
  }
}

export default Home;
