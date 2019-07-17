import axios from 'axios';
import apiKeys from '../apiKeys.json';

const baseUrl = apiKeys.firebaseKeys.databaseURL;

const getProfileHats = uid => new Promise((resolve, reject) => {
  axios.get(`${baseUrl}/profileHats.json?orderBy="uid"&equalTo="${uid}"`)
    .then((res) => {
      const hats = [];
      if (res.data !== null) {
        Object.keys(res.data).forEach((hatKey) => {
          res.data[hatKey].id = hatKey;
          hats.push(res.data[hatKey]);
        });
      }
      resolve(hats);
    })
    .catch(err => reject(err));
});

const getMyProfileHats = uid => new Promise((resolve, reject) => {
  axios.get(`${baseUrl}/profileHats.json`)
    .then((res) => {
      const hats = [];
      if (res.data !== null) {
        Object.keys(res.data).forEach((hatKey) => {
          res.data[hatKey].id = hatKey;
          hats.push(res.data[hatKey]);
        });
      }
      resolve(hats);
    })
    .catch(err => reject(err));
});

const getSingleProfileHat = hatId => axios.get(`${baseUrl}/hats/${hatId}.json`);

const removeHat = hatId => axios.delete(`${baseUrl}/hats/${hatId}.json`);



export default {
  getProfileHats,
  getMyProfileHats,
  getSingleProfileHat,
  removeHat,
};