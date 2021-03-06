import React from "react";

import ProfileHatsCard from "../ProfileHatCard/ProfileHatCard";

import hatData from "../../helpers/data/hatData";

import "./EditHat.scss";

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

  /* Changes the state fore the strings in each category
  for adding then to the page */

  stringStateField = (name, e) => {
    const copyHats = { ...this.state.newHat };
    copyHats[name] = e.target.value;
    this.setState({ newHat: copyHats });
  };

  nameChange = e => this.stringStateField("name", e);
  typeChange = e => this.stringStateField("type", e);
  colorWayChange = e => this.stringStateField("colorWay", e);
  descriptionChange = e => this.stringStateField("description", e);

  // gets data back for the form in edit
  componentDidMount() {
    const hatId = this.props.match.params.id;
    hatData
      .getSingleHat(hatId)
      .then(hatsPromise => this.setState({ newHat: hatsPromise.data }))
      // .then(hatsPromise => console.error(hatsPromise))
      .catch(err => console.error("could not edit hats", err));
  }

  submitForm = e => {
    e.preventDefault();
    const saveHat = { ...this.state.newHat };
    const hatId = this.props.match.params.id;
    hatData
      .putHat(saveHat, hatId)
      .then(() => this.props.history.push("/profile"))
      .catch(err => console.error("unable to post new hat", err));
  };

  render() {
    const { newHat } = this.state;
    const makeHatCards = this.state.hats.map(hat => (
      <ProfileHatsCard key={hat.id} hats={hat} />
    ));

    return (
      <div className="Home col-4 offset-4">
        <form onSubmit={this.submitForm}>
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
              placeholder="Black nad Yellow"
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
        <h1 className="header-title"> </h1>
        <div className="profile-pic" />
        <div className="#">{makeHatCards}</div>
      </div>
    );
  }
}

export default Home;
