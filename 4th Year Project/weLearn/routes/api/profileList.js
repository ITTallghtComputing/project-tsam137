//Imports
const { Router } = require('express')
const ProfilesList = require('../../models/ProfilesList')
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const cors = require('cors');
const router = Router()
const passport = require('passport');
const key = require('../../config/keys').secret;
const bodyParser = require('body-parser');

/**
* @route GET api/profileList/
* @desc Getting a user
* @access Public
*/
router.get('/', async (req, res) => {
    try {
        const User = await ProfilesList.find()
        if (!User) throw new Error('No profileList')
        const sorted = User.sort((a, b) => {
            return new Date(a.date).getTime() - new Date(b.date).getTime()
        })
        res.status(200).json(sorted)
    } catch (error) {
        res.status(500).json({ message: error.message })
    }
})



/**
* @route POST api/profileList/
* @desc Adding a user
* @access Public
*/
router.post('/', (req, res, next) => {
    const newUser = new ProfilesList({

        name: req.body.name,
        email: req.body.email,
        password: bcrypt.hashSync(req.body.password, 10),
        motherTongue: req.body.motherTongue,
        desiredLanguage: req.body.desiredLanguage,
        meetingPlatform: req.body.meetingPlatform
    })
    newUser.save(err => {
        if (err) {
            return res.status(400).json({
                title: 'error',
                msg: 'Email is already registred. Did you forgot your password.'
            })
        }
        return res.status(200).json({
            msg: 'Register Successful'
        })
    })
})



/**
* @route POST api/users/login
* @desc Signing in the User
* @access Public
*/
router.post('/login', (req, res) => {
    ProfilesList.findOne({
        email: req.body.email
    }).then(user => {
        if (!user) {
            return res.status(404).json({
                msg: "Email is not found.",
                success: false
            });
        }
        // If there is user we are now going to compare the password
        bcrypt.compare(req.body.password, user.password).then(isMatch => {
            if (isMatch) {
                // User's password is correct and we need to send the JSON Token for that user
                const payload = {
                    _id: user._id,
                    name: user.name,
                    email: user.email
                }
                jwt.sign(payload, key, {
                    expiresIn: 604800
                }, (err, token) => {
                    res.status(200).json({
                        success: true,
                        token: `Bearer ${token}`,
                        user: user,
                        msg: "Hurry! You are now logged in."
                    });
                })
            } else {
                return res.status(404).json({
                    msg: "Incorrect password.",
                    success: false
                });
            }
        })
    });
});

/**
* @route GET api/users/profile
* @desc Return the User's Data
* @access Private
*/
router.get('/profile', passport.authenticate('jwt', {
    session: false
}), (req, res) => {
    return res.json({
        user: req.user
    });
});


/**
* @route PUT api/profileList/
* @desc Updating a user by ID
* @access Public
*/
router.put('/:id', async (req, res) => {
    const { id } = req.params

    try {
        const response = await ProfilesList.findByIdAndUpdate(id, req.body)
        if (!response) throw Error('Something went wrong ')
        const updated = { ...response._doc, ...req.body }
        res.status(200).json(updated)
    } catch (error) {
        res.status(500).json({ message: error.message })
    }
})

/**
* @route GET api/profileList/
* @desc Getting a single user by ID
* @access Public
*/
router.get('/:id', async (req, res) => {
    const { id } = req.params

    try {
        const response = await ProfilesList.findByIdAndUpdate(id, req.body)
        if (!response) throw Error('Something went wrong ')
        const updated = { ...response._doc, ...req.body }
        res.status(200).json(updated)
    } catch (error) {
        res.status(500).json({ message: error.message })
    }
})

/**
* @route DELETE api/profileList/:id
* @desc Deleting a user by their ID
* @access Public
*/
router.delete('/:id', async (req, res) => {
    const { id } = req.params
    try {
        const removed = await ProfilesList.findByIdAndDelete(id)
        if (!removed) throw Error('Something went wrong ')
        res.status(200).json(removed)
    } catch (error) {
        res.status(500).json({ message: error.message })
    }
})

module.exports = router
