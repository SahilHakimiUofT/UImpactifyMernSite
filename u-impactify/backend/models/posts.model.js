const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const postSchema = new Schema({
    postTitle: {type: String, required: true},
    postContent: {type: String, required: true},
    postAuthor: {type: String, required: true},
    comments: [{
        commentContent: {type: String},
        commentPoster: {type: String}
    }],
});

const Post = mongoose.model('Posts', postSchema);

module.exports = Post;