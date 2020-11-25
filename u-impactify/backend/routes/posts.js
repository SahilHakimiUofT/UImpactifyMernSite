const router = require('express').Router();
let Post = require('../models/posts.model')

router.route('/add').post((req, res) => {
  const newPost = new Post({ 
    postTitle: req.body.postTitle,
    postContent: req.body.postContent,
    comments: req.body.comments,
    postAuthorName: req.body.postAuthorName,
    postAuthorEmail: req.body.postAuthorEmail,
    numComments: 0
  })
  
  newPost.save()
    .then(() => res.json('Post Added'))
    .catch(err => res.status(400).json('Error: ' + err))
});

router.route('/').get((req, res) => {
    Post.find()
        .then(Post => res.json(Post))
        .catch(err => res.status(400).json('Error: ' + err));
});

router.route('/:id').get((req, res) => {
    Post.findById(req.params.id)
        .then(Post => res.json(Post))
        .catch(err => res.status(400).json('Error: ' + err));
});

router.route('/comments/:id').put((req, res) => {
  Post.updateOne(
  { "_id": req.params.id},
  { $push: { comments: req.body.comments }, $inc: { numComments: 1 }} )
  .then(() => res.json('New Comment Added'))
    .catch(err => res.status(400).json('Error: ' + err))
});

module.exports = router