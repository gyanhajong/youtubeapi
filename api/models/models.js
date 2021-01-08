'use-strict'

const mongoose = require("mongoose");
const mongoosePaginate = require("mongoose-paginate-v2");

var Schema = mongoose.Schema;

var videoSchema = new Schema({
    _id: {
        type: String,
        required: 'No ID specified'
    },
    title: {
        type: String,
        required: 'Title of the video cannot be blank'
    },
    description: {
        type: String,
        default: ''
    },
    publishedDateTime: {
        type: Date,
        default: Date.now
    },
    thumbnail: {
        type: String
    }
});

videoSchema.method("toJSON", function() {
    const{__v, _id, ...object} = this.toObject();
    object.id = _id;
    return object;
});

videoSchema.plugin(mongoosePaginate);
module.exports = mongoose.model('Videos', videoSchema);