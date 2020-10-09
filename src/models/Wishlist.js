const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const wishlistSchema = new Schema(
    {
        album: { type: String, required: true },
        artist: { type: String, required: true},
        year: { type: String, required: true},
        genre: {type: String, required: true},
        cover: {type: String, required: true},
        user:[{type: Schema.Types.ObjectId, ref:"User"}]
    },
    {
        timestamps: true,
    }
);

const Wishlist = mongoose.model('Wishlist', wishlistSchema);
module.exports = Wishlist;
