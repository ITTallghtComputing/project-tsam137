const { Router } = require('express')
const ProfilesList = require('../../models/ProfilesList')
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const cors = require('cors');
const router = Router()

// mongoose.connect('mongodb+srv://admin:welearn127@welearn.avb3e.mongodb.net/welearndb?retryWrites=true&w=majority');

router.get('/', async (req, res) => {
    try {
        const profileList = await ProfilesList.find()
        if (!profileList) throw new Error('No profileList')
        const sorted = profileList.sort((a, b) => {
            return new Date(a.date).getTime() - new Date(b.date).getTime()
        })
        res.status(200).json(sorted)
    } catch (error) {
        res.status(500).json({ message: error.message })
    }
})

// router.post('/', (req, res, next) => {
//     const newUser = new ProfilesList({
      
//       name: req.body.name,
//       email: req.body.email,
//       password: bcrypt.hashSync(req.body.password, 10),
//       motherTongue: req.body.motherTongue,
//       desiredLanguage: req.body.desiredLanguage,
//       meetingPlatform: req.body.meetingPlatform
//     })
//     newUser.save(err => {
//       if (err) {
//         return res.status(400).json({
//           title: 'error',
//           error: 'email in use'
//         })
//       }
//       return res.status(200).json({
//         title: 'signup success'
//       })
//     })
//   })

router.post('/', async (req, res, next) => {
    const newProfilesList = new ProfilesList({
        email: req.body.email,
        name: req.body.name,
        password: bcrypt.hashSync(req.body.password, 10),
        motherTongue: req.body.motherTongue,
        desiredLanguage: req.body.desiredLanguage,
        meetingPlatform: req.body.meetingPlatform
      })
    try {
        const profileList = await newProfilesList.save()
        if (!profileList) throw new Error('Something went wrong saving the profileList')
        ProfilesList.password = bcrypt.hashSync(req.body.password, 10);
        res.status(200).json(profileList)
    } catch (error) {
        res.status(500).json({ message: error.message })
    }
})

router.post('/login', (req, res, next) => {
    ProfilesList.findOne({ email: req.body.email }, (err, user) => {
      if (err) return res.status(500).json({
        title: 'server error',
        error: err
      })
      if (!user) {
        return res.status(401).json({
          title: 'user not found',
          error: 'invalid credentials'
        })
      }
      //incorrect password
      if (!bcrypt.compareSync(req.body.password, user.password)) {
        return res.status(401).json({
          tite: 'login failed',
          error: 'invalid credentials'
        })
      }
      //IF ALL IS GOOD create a token and send to frontend
      let token = jwt.sign({ userId: user._id}, 'secretkey');
      return res.status(200).json({
        title: 'login sucess',
        token: token
      })
    })
  })

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