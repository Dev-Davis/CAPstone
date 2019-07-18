import axios from 'axios';
import apiKeys from '../apiKeys';

const baseUrl = apiKeys.firebase.databaseURL;

const getComments = uid => new Promise((resolve, reject) => {
  axios.get(`${baseUrl}/comments.json?orderBy="uid"&equalTo="${uid}"`)
    .then((res) => {
      const comments = [];
      if (res.data !== null) {
        Object.keys(res.data).forEach((commentKey) => {
          res.data[commentKey].id = commentKey;
          comments.push(res.data[commentKey]);
        })
      }
      resolve(comments);
    })
    .catch(err => reject(err));
})

export default {
  getComments,
}
