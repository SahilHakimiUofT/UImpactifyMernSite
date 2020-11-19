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
  const name = req.body.name
  const description = req.body.description
  const outline = req.body.outline
  const instructor = req.body.instructor
  const lessons = req.body.lessons
  const tasks = req.body.tasks
  const lessonLength = req.body.lessonLength
  const startDate = Date.parse(req.body.startDate)
  const endDate = Date.parse(req.body.endDate)
  const preReq = req.body.preReq
  const preReqFor = req.body.preReqFor
  const difficultyLevel = req.body.difficultyLevel
  const pictureUrl = req.body.pictureUrl

  const newCourse = new Course({name, description, outline, instructor, lessons, tasks, lessonLength, 
    startDate, endDate, preReq, preReqFor, difficultyLevel, pictureUrl})
  
  newCourse.save()
    .then(() => res.json('Course Added'))
    .catch(err => res.status(400).json('Error: ' + err))
});

router.route('/update/:id').patch((req, res) => {
  Course.findById(req.params.id)
    .then(course => {
      course.name = req.body.name
      course.description = req.body.description
      course.outline = req.body.outline
      course.lessons = req.body.lessons
      course.tasks = req.body.tasks
      course.lessonLength = req.body.lessonLength
      course.startDate = Date.parse(req.body.startDate)
      course.endDate = Date.parse(req.body.endDate)
      course.preReq = req.body.preReq
      course.preReqFor = req.body.preReqFor
      course.difficultyLevel = req.body.difficultyLevel
      course.pictureUrl = req.body.pictureUrl

      course.save()
        .then(() => res.json('Course Updated'))
        .catch(err => res.status(400).json('Error: ' + err))
    })
});

router.route('/delete/:id').delete((req, res) => {
  Course.findByIdAndDelete(req.params.id)
    .then(() => res.json("Course deleted"))
    .catch(err => res.status(400).json('Error: ' + err))
});

router.route('/instructor/:id').get((req, res) => {
  Course.find({"instructor": req.params.id})
    .then(courses => res.json(courses))
    .catch(err => res.status(400).json('Error: ' + err))
})

module.exports = router