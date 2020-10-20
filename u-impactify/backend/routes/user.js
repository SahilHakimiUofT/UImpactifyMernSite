const router = require('express').Router();
let User = require('../models/user.model');

router.route('/').get((req, res) => {
    User.find()
        .then(users => res.json(users))
        .catch(err => res.status(400).json('Error: ' + err));
});

router.route('/add').post((req, res) => {
    const username = req.body.username;
    const userType = req.body.userType;
    const newUser = new User({username, userType});

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
    User.findByIdAndUpdate(req.params.id)
        .then(user => {
            user.username = req.body.username;
            user.userType = req.body.userType;

            user.save()
                .then(() => res.json('User Updated'))
                .catch(err => res.status(400).json('Error'));
        })
        .catch(err => res.status(400).json('Error: ' + err));
});

module.exports = router;