import React from "react";
import firebase from "firebase/app";
// import FileUploader from "react-firebase-file-uploader";

import ProfileHatsCard from "../ProfileHatCard/ProfileHatCard";

import hatData from "../../helpers/data/hatData";

import userShapes from '../../helpers/propz/userShapes';

import "./MyProfile.scss";

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
  
// The next four variables sets you form to a set state of controlled or uncontrolled
  // nameChange = (e) => {
  //   e.preventDefault();
  //   this.setState({ name: e.target.value })
  // } 
  
  // typeChange = (e) => {
  //   e.preventDefault();
  //   this.setState({ type: e.target.value })
  // } 
  
  // colorWayChange = (e) => {
  //   e.preventDefault();
  //   this.setState({ colorWay: e.target.value })
  // } 
  
  // descriptionChange = (e) => {
  //   e.preventDefault();
  //   this.setState({ description: e.target.value })
  // }

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
          <img src="https://scontent-msp1-1.xx.fbcdn.net/v/t1.0-9/1625624_547718411992311_1237413250_n.jpg?_nc_cat=100&_nc_oc=AQm_nsS7WtfU9RuoqBrMTF29PCOzHt6-CZPofoYhrXCzuixgpclDeHS4PGvJ-Sf5tbQ&_nc_ht=scontent-msp1-1.xx&oh=ef4e2d2355e6e6ae3da59aa529c3f723&oe=5DE68724" alt="profile-pic" className="profilePhoto"/>
          <form className="col-4 offset-8" onSubmit={this.submitForm}>
            <div className="uploadTitle">
              Add a hat...
            </div>
              {/* <div className="form-group">
                <label htmlFor="hatImage">Hat Image</label>
                <input
                  type="text"
                  className="form-control"
                  id="hatImage"
                  placeholder="Paste Image Link Here"
                  value={this.state.imageUrl}
                  onChange={this.imageChange}
                />
              </div> */}
              <div className="form-group">
                <label htmlFor="hatName">Name</label>
                <input
                  type="text"
                  className="form-control"
                  id="hatName"
                  placeholder="Batman Snapback"
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
                  placeholder="Snapback"
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
                  placeholder="Black and Yellow"
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
                  placeholder="A solid black hat with the Batman logo embroidered in the front"
                  value={this.state.newHat.description}
                  onChange={this.descriptionChange}
                />
              </div>
              <button type="submit" className="btn btn-primary">
                Submit
              </button>
          </form>
        </div>
        <div className="aboutSection text-center col-4 offset-4">
          <span className="aboutMe">About Me</span>
          <br></br>
        {/* </div>
        <div className="aboutMeDescription col-4 offset-4"> */}
          I am a lover of hats! This is a website for hat lovers such as myself. Hope you like it also.
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
