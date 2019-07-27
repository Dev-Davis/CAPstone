import React from "react";
import firebase from "firebase/app";
// import { Link } from 'react-router-dom';

import ProfileHatsCard from "../ProfileHatCard/ProfileHatCard";

import hatData from "../../helpers/data/hatData";

import "./MyProfile.scss";

const defaultHatInfo = {
  name: "",
  type: "",
  colorWay: "",
  description: ""
};

class Home extends React.Component {
  state = {
    hats: [],
    newHat: defaultHatInfo
  };

  /* Changes the state for the strings in each category
  for adding them to the page */

  stringStateField = (name, e) => {
    const copyHats = { ...this.state.newHat };
    copyHats[name] = e.target.value;
    this.setState({ newHat: copyHats });
  };

  nameChange = e => this.stringStateField("name", e);
  typeChange = e => this.stringStateField("type", e);
  colorWayChange = e => this.stringStateField("colorWay", e);
  descriptionChange = e => this.stringStateField("description", e);

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
      .catch(err => console.error("unable to post new hat", err));
  };

  deleteHat = hatId => {
    hatData
      .removeHat(hatId)
      .then(() => this.getHats())
      .catch(err => console.error("unable to delete the hat", err));
  };

  fileSelectedHandler = e => {
    e.preventDefault();
  };
  
  render() {
    const { newHat } = this.state;
    const makeHatCards = this.state.hats.map(hat => (
      <ProfileHatsCard key={hat.id} hats={hat} deleteHat={this.deleteHat} />
      ));
      
      return (
        // <div className="profile-pic">
        //   {/* <img src="..." alt="..." /> */}
        // </div>
      <div className="#">
        <div className="container">
          <img src="https://scontent-msp1-1.xx.fbcdn.net/v/t1.0-9/1625624_547718411992311_1237413250_n.jpg?_nc_cat=100&_nc_oc=AQm_nsS7WtfU9RuoqBrMTF29PCOzHt6-CZPofoYhrXCzuixgpclDeHS4PGvJ-Sf5tbQ&_nc_ht=scontent-msp1-1.xx&oh=ef4e2d2355e6e6ae3da59aa529c3f723&oe=5DE68724" alt="profile-pic" className="profilePhoto"/>
          <div className="container">
            <form className="coil-4 offset-8" onSubmit={this.submitForm}>
              <div className="upload-group">
                <label htmlFor="uploadFile"></label>
                <input
                  type="file"
                  className="upload-group"
                  id="uploadFile"
                  // placeholder="Batman Snapback"
                  value={newHat.name}
                  onChange={this.nameChange}
                />
              </div>
              <div className="form-group">
                <label htmlFor="hatName">Name</label>
                <input
                  type="text"
                  className="form-control"
                  id="hatName"
                  placeholder="Batman Snapback"
                  value={newHat.name}
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
                  value={newHat.type}
                  onChange={this.typeChange}
                />
              </div>
              <div className="form-group">
                <label htmlFor="colorWay">Color</label>
                <input
                  type="text"
                  className="form-control"
                  id="colorWay"
                  placeholder="Black and Yellow"
                  value={newHat.colorWay}
                  onChange={this.colorWayChange}
                />
              </div>
              <div className="form-group">
                <label htmlFor="hatDescription">Description</label>
                <input
                  type="text"
                  className="form-control"
                  id="hatDescription"
                  placeholder="A solid black hat with the Batman logo embroidered in the front"
                  value={newHat.description}
                  onChange={this.descriptionChange}
                />
              </div>
              <button type="submit" className="btn btn-primary">
                Submit
              </button>
            </form>
          </div>
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
