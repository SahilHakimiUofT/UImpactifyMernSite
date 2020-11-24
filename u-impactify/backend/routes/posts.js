const router = require('express').Router();
let Post = require('../models/posts.model')

router.route('/add').post((req, res) => {
  const newPost = new Post({ 
    postTitle: req.body.postTitle,
    postContent: req.body.postContent,
    comments: req.body.comments,
    postAuthor: req.body.postAuthor
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

module.exports = router