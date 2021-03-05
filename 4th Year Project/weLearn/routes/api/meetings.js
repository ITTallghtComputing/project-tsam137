//Imports
const { Router } = require('express')
const ProfilesList = require('../../models/ProfilesList')
const Meetings = require('../../models/Meetings')
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const cors = require('cors');
const router = Router()
const passport = require('passport');
const key = require('../../config/keys').secret;
const bodyParser = require('body-parser');

//**********Meeting Code**************/

/**
* @route GET api/meetings/
* @desc Getting a meeting
* @access Public
*/
router.get('/', async (req, res) => {
    try {
        const Meeting = await Meetings.find()
        if (!Meeting) throw new Error('No Meetings')
        const sorted = Meeting.sort((a, b) => {
            return new Date(a.date).getTime() - new Date(b.date).getTime()
        })
        res.status(200).json(sorted)
    } catch (error) {
        res.status(500).json({ message: error.message })
        res.status(400).json({ message: error.message })
    }
})

/**
* @route GET api/meetings/
* @desc Getting a single metting by ID
* @access Public
*/
router.get('/:id', async (req, res) => {
    const { id } = req.params

    try {
        const response = await Meetings.findByIdAndUpdate(id, req.body)
        if (!response) throw Error('Something went wrong ')
        const updated = { ...response._doc, ...req.body }
        res.status(200).json(updated)
    } catch (error) {
        res.status(500).json({ message: error.message })
    }
})

/**************************************************************CHECK THIS CODE
* @route POST api/meetings/
* @desc Adding a meeting
* @access Public
*/
router.post('/', (req, res, next) => {
    const newMeeting = new Meetings({

        name: req.body.name,
        email: req.body.email,
        toEmail: req.body.toEmail,
        motherTongue: req.body.motherTongue,
        date: req.body.date,
        time: req.body.time,
        timezone: req.body.timezone,
        meetingLink: req.body.meetingLink,
        userID: req.body.userID,
        toUserID: req.body.toUserID
    })
    newMeeting.save(err => {
        if (err) {
            return res.status(400).json({
                title: 'error',
                msg: 'Meeting could not be registered'
            })
        }
        return res.status(200).json({
            msg: 'Meeting Registered Successfully'
        })
    })
})

/**
* @route PUT api/meetings/
* @desc Updating a meeting by ID
* @access Public
*/
router.put('/:id', async (req, res) => {
    const { id } = req.params

    try {
        const response = await Meetings.findByIdAndUpdate(id, req.body)
        if (!response) throw Error('Something went wrong ')
        const updated = { ...response._doc, ...req.body }
        res.status(200).json(updated)
    } catch (error) {
        res.status(500).json({ message: error.message })
    }
})

/**
* @route DELETE api/meeting/:id
* @desc Deleting a meeting by their ID
* @access Public
*/
router.delete('/:id', async (req, res) => {
    const { id } = req.params
    try {
        const removed = await Meetings.findByIdAndDelete(id)
        if (!removed) throw Error('Something went wrong ')
        res.status(200).json(removed)
    } catch (error) {
        res.status(500).json({ message: error.message })
    }
})

module.exports = router