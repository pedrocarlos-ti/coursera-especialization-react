const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const favoriteSchema = new Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: true,
      unique: true
    },
    dishes: [
      {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: 'Dish'
      }
    ]
  },
  {
    timestamps: true
  }
);

const FavoriteModel = mongoose.model('Favorites', favoriteSchema);

module.exports = FavoriteModel;
