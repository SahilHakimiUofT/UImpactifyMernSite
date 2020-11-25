const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const postSchema = new Schema({
    postTitle: {type: String, required: true},
    postContent: {type: String, required: true},
    postAuthorName: {type: String, required: true},
    postAuthorEmail: {type: String, required: true},
    comments: [{
        commentContent: {type: String},
        commentPoster: {type: String},
        commentPosterEmail: {type: String}
    }],
    numComments: {type: Number}
});

const Post = mongoose.model('Posts', postSchema);

module.exports = Post;