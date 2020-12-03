const router = require('express').Router();
let User = require('../models/user.model');

router.route('/').get((req, res) => {
    User.find()
      .then(users => res.json(users))
      .catch(err => res.status(400).json('Error: ' + err))
  });




router.route('/:id').get((req, res) => {
    User.findById(req.params.id)
        .populate({
            path: 'enrollCourse',
            populate: { path: 'courseId' },
        })
        .then(user => res.json(user))
        .catch(err => res.status(400).json('Error: ' + err));
});

router.route('/add').post((req, res) => {
    const _id = req.body._id
    const userType = req.body.userType;
    const email = req.body.email;
    const userName = req.body.username;
    const phoneNumber = "";
    const firstName = req.body.firstName;
    const lastName = req.body.lastName;
    const skills = "";
    const completedCourses = "";
    const languages = "";
    const description = "";
    const education = "";
    const enrollCourse = req.body.enrollCourse;

    const newUser = new User({_id, userName, userType, email, phoneNumber, firstName, lastName,
        skills, completedCourses, languages, description, education, enrollCourse});
    

    newUser.save()
        .then(() => res.json('User Added'))
        .catch(err => res.status(400).json('Error: ' + err));
});

router.route('/delete/:id').delete((req, res) => {
    User.findByIdAndDelete(req.params.id)
        .then(() => res.json('User Deleted'))
        .catch(err => res.status(400).json('Error: ' + err));
});

router.route('/update/:id').put((req, res) => {  
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
            user.enrollCourse = req.body.enrollCourse;
    
            user.save()
                .then(() => res.json('User Updated'))
                .catch(err => res.status(400).json('Error' + err));
        })
        .catch(err => res.status(400).json('Error: ' + err));
});

router.route('/update/photo/:id').post((req, res) => {
  User.findById(req.params.id)
        .then(user => {
            user.profilePicUrl = req.body.profilePicUrl
            user.save()
                .then(() => res.json('User Updated'))
                .catch(err => res.status(400).json('Error'));
        })
        .catch(err => res.status(400).json('Error: ' + err));
})



module.exports = router;