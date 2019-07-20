import axios from 'axios';
import apiKeys from '../apiKeys';

const baseUrl = apiKeys.firebaseKeys.databaseURL;

const getComments = uid => new Promise((resolve, reject) => {
  axios.get(`${baseUrl}/comments.json`)
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

const getCommentByHatId = hatId => new Promise((resolve, reject) => {
  axios.get(`${baseUrl}/comments.json?orderBy="hatId"&equalTo="${hatId}"`)
    .then((res) => {
      const commentResults = res.data;
      const comments = [];
      Object.keys(commentResults).forEach((hatId) => {
        commentResults[hatId].id = hatId;
        commentResults[hatId].commentId = hatId;
        comments.push(commentResults[hatId]);
      })
      resolve(comments);
    })
    .catch(err => reject(err));
})

const makeCommentsByHatId = commentData => axios.post(`${baseUrl}/comments.json`, commentData);

export default {
  getComments,
  getCommentByHatId,
  makeCommentsByHatId,
}