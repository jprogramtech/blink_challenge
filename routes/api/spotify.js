const express = require('express');
const router = express.Router();
const spotifyCreds = require('../../config/keys');
const axios = require('axios');
const keys = require('../../config/keys');
const passport = require('passport');

const validateToken = require('../../utils/middleware/validateToken');

const spotify_url_search = 'https://api.spotify.com/v1/search';

// @route GET /api/spotify/artist/:artist
// @desc get artist by name or id
// @access public
router.get('/artist/:artist', async (req, res) => {
  let offset = req.query.offset;
  if (offset === undefined) {
    offset = 0;
  }

  let searchString = req.params.artist.replace(/\s/g, '%20');
  try {
    const response = await axios.get(
      `https://api.spotify.com/v1/search?q=${searchString}&type=artist&limit=8&offset=${offset}`
    );
    res.json(response.data);
  } catch (error) {
    res
      .status(error.response.data.error.status)
      .json({ errors: error.response.data.error.message });
  }
});

// @route GET /api/spotify/album/:album
// @desc get album by album name - just from demo
// @desc to show how I would break apart certain routes if needed
// @access private
router.get(
  '/album/:album',
  passport.authenticate('jwt', { session: false }),
  async (req, res) => {
    let searchString = req.params.album.replace(/\s/g, '%20');
    try {
      const response = await axios.get(
        `https://api.spotify.com/v1/search?q=${searchString}&type=album`
      );
      res.json(response.data);
    } catch (error) {
      res
        .status(error.response.data.error.status)
        .json({ errors: error.response.data.error.message });
    }
  }
);

// @route GET /api/spotify/playlist/
// @desc get playlist by playlist name
// @desc to show how I would break apart certain routes if needed
// @access private
router.get(
  '/playlist/:playlist',
  passport.authenticate('jwt', { session: false }),
  async (req, res) => {
    let searchString = req.params.playlist.replace(/\s/g, '%20');
    try {
      const response = await axios.get(
        `https://api.spotify.com/v1/search?q=${searchString}&type=playlist`
      );
      res.json(response.data);
    } catch (error) {
      res
        .status(error.response.data.error.status)
        .json({ errors: error.response.data.error.message });
    }
  }
);

module.exports = router;
