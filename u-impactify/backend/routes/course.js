const router = require('express').Router();
let Course = require('../models/course.model')

router.route('/').get((req, res) => {
  Course.find()
    .then(courses => res.json(courses))
    .catch(err => res.status(400).json('Error: ' + err))
});

router.route('/:id').get((req, res) => {
  Course.findById(req.params.id)
    .then(course => res.json(course))
    .catch(err => res.status(400).json('Error: ' + err))
});

router.route('/add').post((req, res) => {

});

router.route('/update/:id').patch((req, res) => {

});

router.route('/delete/:id').delete((req, res) => {
  Course.findByIdAndDelete(req.params.id)
    .then(() => res.json("Course deleted"))
    .catch(err => res.status(400).json('Error: ' + err))
});