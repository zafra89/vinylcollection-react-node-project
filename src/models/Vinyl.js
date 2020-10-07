const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const vinylSchema = new Schema(
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

const Vinyl = mongoose.model('Vinyl', vinylSchema);
module.exports = Vinyl;
