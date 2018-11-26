const mongoose = require('mongoose');
const Schema = mongoose.Schema;

// Used to save favorite spotify artists for user
// Relation formed with user object
// This will enable me to do a simple query for all
// favorites to associated logged in user
const FavoriteSchema = new Schema({
  user: {
    type: Schema.Types.ObjectId,
    ref: 'users'
  },
  name: {
    type: String,
    required: true
  },
  imageUrl: {
    type: String
  },
  externalUrl: {
    type: String
  },
  followers: {
    type: Number
  }
});

module.exports = Favorite = mongoose.model('favorites', FavoriteSchema);
