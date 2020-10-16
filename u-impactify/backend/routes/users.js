const router = require('express').Router();
let User = require('../models/user.model');

router.route('/:id').get((req, res) => {
    User.findById(req.params.id)
        .then(users => res.json(users))
        .catch(err => res.status(400).json('Error: ' + err));
});

router.route('/:id').delete((req, res) => {
    User.findByIdAndDelete(req.params.id)
        .then(() => res.json('Exercise deleted.'))
        .catch(err => res.status(400).json('Error: ' + err));
});

router.route('/update/:id').post((req, res) => {
    User.findById(req.params.id)
        .then(users => {
            users.firstName = req.body.firstName;
            users.lastName = req.body.lastName;
            users.email = req.body.email;
            users.phoneNumber = req.body.phoneNumber;
            users.skills = req.body.skill;
            users.completedCourses = req.body.completedCourses;
            users.languages = req.body.languages;
            users.description = req.body.description;
        })
        .catch(err => res.status(400).json('Error: ' + err));
});

router.route('/add').post((req, res) => {
    const firstName = req.body.firstName;
    const lastName = req.body.lastName;
    const email = req.body.email;
    const phoneNumber = req.body.phoneNumber;
    const skills = req.body.skills;
    const completedCourses = req.body.completedCourses;
    const languages = req.body.languages;
    const description = req.body.description;

    const newUser = new User({
        firstName, lastName, email, phoneNumber, 
        skills, completedCourses, languages, description});

    newUser.save()
        .then(() => res.json('User Info added!'))
        .catch(err => res.status(400).json('Error: ' + err));
});


module.exports = router;