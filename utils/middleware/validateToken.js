const keys = require('../../config/keys');
const axios = require('axios');

let accessToken;
let expiredTime;

// @Desc MiddleWare function to ensure
// Spotify Token is still valid
// Other options to store access token
// would be in DB or local file or some other storage bucket
// This is just a demo app so just
// maintaining in memory

// TODO: need to test for expired token
function validateToken(req, res, next) {
  if (tokenExpired() || accessToken === undefined) {
    let buff = new Buffer.from(keys.clientId + ':' + keys.clientSecret);
    let base64data = buff.toString('base64');
    axios({
      method: 'post',
      url: 'https://accounts.spotify.com/api/token',
      params: {
        grant_type: 'client_credentials'
      },
      headers: {
        Authorization: 'Basic ' + base64data,
        'Content-Type': 'application/x-www-form-urlencoded'
      }
    })
      .then(token => {
        accessToken = token.data;
        expiredTime = Date.now() + 60000 * 45;

        axios.defaults.headers.common['Authorization'] =
          'Bearer ' + token.data.access_token;
        next();
      })
      .catch(e => {
        return e.response.data;
      });
  } else {
    next();
  }
}

function tokenExpired() {
  if (accessToken === undefined) {
    return true;
  }

  if (expiredTime <= Date.now()) {
    return true;
  }

  return false;
}

module.exports = validateToken;
