const router = require('express').Router();
let Application = require('../models/application.model')

router.route('/add').post((req, res) => {
  const newApplication = new Application({ 
    positionId: req.body.positionId,
    applicantId: req.body.applicantId,
    resumeId: req.body.resumeId,
    coverLetterId: req.body.coverLetterId,
  })
  
  newApplication.save()
    .then(() => res.json('Application Added'))
    .catch(err => res.status(400).json('Error: ' + err))
});

module.exports = router
