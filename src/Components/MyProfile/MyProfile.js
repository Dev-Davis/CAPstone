import React from 'react';
import firebase from 'firebase/app';
// import { Link } from 'react-router-dom';

import ProfileHatsCard from '../ProfileHatCard/ProfileHatCard';

import hatData from '../../helpers/data/hatData';

import './MyProfile.scss';

const defaultHatInfo = {
  name: '',
  type: '',
  colorWay: '',
  description: '',
}

class Home extends React.Component {
  state = {
    hats: [],
    newHat: defaultHatInfo,
  }

  /* Changs ht e state fore the strings in each category
  for adding then to the page */

  stringStateField = (name, e) => {
    const copyHats = { ...this.state.newHat };
    copyHats[name] = e.target.value;
    this.setState({ newHat: copyHats });
  }

  nameChange = e => this.stringStateField('name', e);
  typeChange = e => this.stringStateField('type', e);
  colorWayChange = e => this.stringStateField('colorWay', e);
  descriptionChange = e => this.stringStateField('description', e);

  getHats = () => {
    const { uid } = firebase.auth().currentUser;
    hatData.getHats(uid)
      .then(hats => this.setState({hats}))
      .catch(err => console.error('could not get hats for home', err));
  }


  componentDidMount() {
    this.getHats();
  }

  submitForm = (e) => {
    e.preventDefault();
    const saveHat = { ...this.state.newHat };
    saveHat.uid = firebase.auth().currentUser.uid;
    hatData.postNewHat(saveHat)
      .then(() => this.props.history.push('/'))
      .catch( err => console.error('unable to post new hat', err));
  }

  deleteHat = (hatId) => {
    hatData.removeHat(hatId)
      .then(() => this.getHats())
      .catch(err => console.error('unable to delete the hat', err));
  }

  fileSelectedHandler = (e) => {
    e.preventDefault();
    console.error('file was chosen', e);
  }

  render() {
    const { newHat } = this.state;
    const makeHatCards = this.state.hats.map(hat => (
      <ProfileHatsCard
        key={hat.id}
        hats={hat}
        deleteHat={this.deleteHat}
      />
    ));

    return (
      <div className="Home col-10 offset-1">
        <form className="col-4 offset-4" onSubmit={this.submitForm}>
          <div className="form-group">
            <label htmlFor="hatName">Name</label>
            <input
            type="text"
            className="form-control"
            id="hatName"
            placeholder="Batman Snapback"
            value={newHat.name}
            onChange={this.nameChange}/>
          </div>
          <div className="form-group">
            <label htmlFor="hatType">Type</label>
            <input
            type="text"
            className="form-control"
            id="hatType"
            placeholder="Snpaback"
            value={newHat.type}
            onChange={this.typeChange}/>
          </div>
          <div className="form-group">
            <label htmlFor="colorWay">Color</label>
            <input
            type="text"
            className="form-control"
            id="colorWay"
            placeholder="Black nad Yellow"
            value={newHat.colorWay}
            onChange={this.colorWayChange}/>
          </div>
          <div className="form-group">
            <label htmlFor="hatDescription">Description</label>
            <input
            type="text"
            className="form-control"
            id="hatDescription"
            placeholder="A solid black hat with the Batman logo embroidered in the front"
            value={newHat.description}
            onChange={this.descriptionChange}/>
          </div>
          <button type="submit" className="btn btn-primary">Submit</button>
        </form>
        <h1 className="header-title">Profile Page</h1>
          <div className="profile-pic">
            {/* <img src="..." alt="..." /> */}
          </div>
          <div className="d-flex flex-wrap col-10 offset-1">
            {makeHatCards}
          </div>
      </div>
    );
  }
}

export default Home;

