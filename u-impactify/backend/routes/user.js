const router = require('express').Router();
let User = require('../models/user.model');

router.route('/:id').get((req, res) => {
    User.findById(req.params.id)
        .then(user => res.json(user))
        .catch(err => res.status(400).json('Error: ' + err));
});

router.route('/add').post((req, res) => {
    const userName = req.body.userName;
    const userType = req.body.userType;
    const email = req.body.email;
    const phoneNumber = req.body.phoneNumber;
    const firstName = req.body.firstName;
    const lastName = req.body.lastName;
    const skills = req.body.skills;
    const completedCourses = req.body.completedCourses;
    const languages = req.body.languages;
    const description = req.body.description;
    const education = req.body.education;


    const newUser = new User({userName, userType, email, phoneNumber, firstName, lastName,
                              skills, completedCourses, languages, description, education});

    newUser.save()
        .then(() => res.json('User Added'))
        .catch(err => res.status(400).json('Error: ' + err));
});

router.route('/delete/:id').delete((req, res) => {
    User.findByIdAndDelete(req.params.id)
        .then(() => res.json('User Deleted'))
        .catch(err => res.status(400).json('Error: ' + err));
});

router.route('/update/:id').post((req, res) => {  
    User.findById(req.params.id)
        .then(user => {
            user.email = req.body.email;
            user.phoneNumber = req.body.phoneNumber;
            user.firstName = req.body.firstName;
            user.lastName = req.body.lastName;
            user.skills = req.body.skills;
            user.completedCourses = req.body.completedCourses;
            user.languages = req.body.languages;
            user.description = req.body.description;
            user.education = req.body.education;
    
            user.save()
                .then(() => res.json('User Updated'))
                .catch(err => res.status(400).json('Error'));
        })
        .catch(err => res.status(400).json('Error: ' + err));
});

module.exports = router;