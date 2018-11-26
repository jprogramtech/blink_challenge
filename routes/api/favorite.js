const express = require('express');
const router = express.Router();
const Favorite = require('../../models/Favorites');
const passport = require('passport');

//@route POST /api/favorite
//@desc create favorite
//@access private
router.post(
  '/',
  passport.authenticate('jwt', { session: false }),
  (req, res) => {
    const newFavorite = new Favorite({
      name: req.body.name,
      imageUrl: req.body.imageUrl,
      externalUrl: req.body.externalUrl,
      followers: req.body.followers,
      user: req.user.id
    })
      .save()
      .then(favorite => res.json(favorite))
      .catch(err => {
        // Just sending generic error message
        // this could be better
        res.status(500).json({ errors: 'Unable to create favorite' });
      });
  }
);

//@route get /api/favorite
//@desc get all favorites asscoiated to user
//@access private
router.get(
  '/',
  passport.authenticate('jwt', { session: false }),
  (req, res) => {
    Favorite.find({
      user: req.user.id
    })
      .then(favorites => {
        res.json({ favorites });
      })
      .catch(err => {
        // Just sending generic error message
        // this could be better
        res.status(500).json({ errors: 'Unabled to obtain favorites' });
      });
  }
);

module.exports = router;
