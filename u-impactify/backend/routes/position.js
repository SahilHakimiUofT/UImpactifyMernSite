const router = require('express').Router();
const { populate } = require('../models/position.model');
let Position = require('../models/position.model');

router.route('/jobid/:id').get((req, res) => {
    Position.findById(req.params.id)
        .then(position => res.json(position))
        .catch(err => res.status(400).json('Error: ' + err));
});

router.route('/byorg/:email').get((req, res) => {
    const oremail = req.params.email;
    Position.find({ orgemail: oremail })
        .populate({
          path: 'applications',
          populate: { path: 'applicant' },
        })
        .exec()
        .then(positions => {
          res.json(positions)
        })
        .catch(err => res.status(400).json('Error: ' + err));
});

router.route('/').get((req, res) => {
    Position.find()
        .then(position => res.json(position))
        .catch(err => res.status(400).json('Error: ' + err));
});

router.route('/add').post((req, res) => {
    const positionTitle = req.body.positionTitle;
    const organization = req.body.organization;
    const employmentType = req.body.employmentType;
    const description = req.body.description;
    const location = req.body.location; 
    const orgemail = req.body.orgemail; 

    const newPosition = new Position({positionTitle, organization, employmentType, description, location, orgemail});

    newPosition.save()
        .then(() => res.json('Position Added'))
        .catch(err => res.status(400).json('Error: ' + err));
});

router.route('/delete/:id').delete((req, res) => {
    Position.findByIdAndDelete(req.params.id)
        .then(() => res.json('Position Deleted'))
        .catch(err => res.status(400).json('Error: ' + err));
});

router.route('/update/:id').post((req, res) => {
    Position.findById(req.params.id)
        .then(position => {
            position.userTitle = req.body.positionTitle;
            position.organization = req.body.organization;
            position.employmentType = req.body.employmentType;
            position.description = req.body.description;
            position.location = req.body.location;

            position.save()
                .then(() => res.json("Position Updated"))
                .catch(err => res.status(400).json('Error: ' + err));
        })
        .catch(err => res.status(400).json('Error: ' + err));
});

module.exports = router;