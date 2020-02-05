/*const options = {
  BASEURL: process.env.BASEURL,
  APIKEY: process.env.APIKEY,
};

const api = options;

module.exports = api;
*/
import axios from 'axios';

export const BASEURL = 'https://www.omdbapi.com/?s=';

export const API = 'apikey=37b11c7';

// Export an object with a "search" method that searches the  API for the passed query
export default {
  search: function(title, year) {
    return axios.get(BASEURL + API + '&t=' + title + '&y=' + year);
  },
};
