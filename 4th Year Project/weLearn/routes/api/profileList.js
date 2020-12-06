const { Router } = require('express')
const ProfilesList = require('../../models/ProfilesList')
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const cors = require('cors');
const router = Router()
const passport = require('passport');
const key = require('../../config/keys').secret;
const bodyParser = require('body-parser');


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
* @route POST api/users/profile
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

// router.put('/:id', async (req, res) => {
//     const { id } = req.params
//     try {
//         const response = await ProfilesList.findByIdAndUpdate(id, newUser)
//         if (!response) throw Error('Something went wrong ')
//         const updated = { ...response._doc, ...req.body }
//         res.status(200).json(updated)
//     } catch (error) {
//         res.status(500).json({ message: error.message })
//     }
// })

/*
    GET Method single User by Id
*/
router.get('/:id', (req, res, next) => {
    let id = req.params.id;
    ProfilesList.findOne({
        _id: id
    }).then((user) => {
        return res.json({
            success: true,
            post: user
        });
    }).catch((err) => {
        return res.json({
            success: false,
            msg: 'Unable to get the User.',
            err: err
        });
    });
});

/*
    PUT Method to Update single User by Id
*/

router.put('/', (req, res, next) => {

    let email = req.body.email;
    let name = req.body.name;
    let password = req.body.password;
    let motherTongue = req.body.motherTongue;
    let desiredLanguage = req.body.desiredLanguage;
    let meetingPlatform = req.body.meetingPlatform;

    let id = req.body._id;
    ProfilesList.findOne({
        _id: id
    }).then((user) => {
        user.email= email;
        user.name = name;
        user.password = password;
        user.motherTongue = motherTongue;
        user.desiredLanguage = desiredLanguage;
        user.meetingPlatform = meetingPlatform;
        user.save()
            .then((post) => {
                return res.json({
                    success: true,
                    msg: 'User updated successfully',
                    post: user
                });
            }).catch((err) => {
                return res.json({
                    success: false,
                    msg: 'Unable to update the User.',
                    err: err
                });
            });
    }).catch((err) => {
        return res.json({
            success: false,
            message: 'Opps! something went wrong.',
            err: err
        });
    });
});


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
