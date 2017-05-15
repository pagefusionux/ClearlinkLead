import axios from 'axios';
import Config from 'app/config';

export const APIgetUserTypes = () => {
  axios
  .get(`${Config.apiUrl}/userTypes`)
  .then(response => {
    console.log("APIgetUserTypes(): ", response.data.data);

    return response.data.data;

  }).catch(response => {
    console.log('Error getting userTypes!', response);
    return [];
  });
};
