import axios from 'axios';
import apiKeys from '../apiKeys.json';

const baseUrl = apiKeys.firebaseKeys.databaseURL;

const getHats = uid => new Promise((resolve, reject) => {
  axios.get(`${baseUrl}/hats.json?orderBy="uid"&equalTo="${uid}"`)
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

const getMyHats = uid => new Promise((resolve, reject) => {
  axios.get(`${baseUrl}/hats.json`)
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

const postNewHat = newHat => axios.post(`${baseUrl}/hats.json`, newHat);

export default {
  getHats,
  getMyHats,
  postNewHat,
};
