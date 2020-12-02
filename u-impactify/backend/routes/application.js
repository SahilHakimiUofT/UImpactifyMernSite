const router = require('express').Router();
let Application = require('../models/application.model');
let Position = require('../models/position.model');
const  { Types: { ObjectId } }  = require('mongoose');

router.route('/add').post((req, res) => {
  const newApplication = new Application({ 
    position: req.body.positionId,
    applicant: req.body.applicantId,
    resumeId: req.body.resumeId,
    coverLetterId: req.body.coverLetterId,
  })
  
  newApplication.save()
    .then((application) => {
      Position.findById(application.position)
        .then(position => {
          if (!position.applications) {
            position.applications = [];
          }
          position.applications.push(application._id)
          position.save()
            .then(() => res.json('Application Added'))
        })
    })
    .catch(err => {
      return res.status(400).json('Error: ' + err)
    })
});

router.route('/delete/:id').delete((req, res) => {
  Application.findByIdAndDelete(req.params.id)
    .then(application => {
      Position.findById(application.position)
        .then(position => {
          position.applications = position.applications.filter(app => !app.equals(application._id));
          console.log(application);
          console.log(position);
          position.save()
            .then(() => res.json('Application Deleted'))
        })
    })
    .catch(err => res.status(400).json('Error: ' + err))
})

module.exports = router
