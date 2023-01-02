const express = require('express');
const router = express.Router()
const { body, validationResult } = require('express-validator');
const verifyToken = require('../middlewares/verifyToken')
const Notes = require('../models/Notes')
const User = require('../models/User')

// ROUTE no.1 : fetching notes of user from database and sending them to the client
router.get('/mynotes', verifyToken, async (req, res) => {
    const userId = req.user.id
    const userNotes = await Notes.find({ userId: userId }).select({ userId: 0 })
    const user = await User.findById(userId)
    res.send({ auther: user.name, notesCount: userNotes.length, notes: userNotes })
})

// ROUTE no.2 : storing notes in the database sent by the user to the server along with user id useing jwt token
router.post('/makenotes', verifyToken, [body('title', "Title is required").isLength({ min: 1 })],
    async (req, res) => {

        const { title, tag, description, date } = req.body
        const errors = validationResult(req)
        if (!errors.isEmpty()) return res.status(400).json(errors.array())
        const userNotes = await Notes.create({
            userId: req.user.id,
            title: title,
            tag: tag,
            description: description,
            date: date
        })
            .catch(err => res.status(500).send(err))

        res.json({data: userNotes, message: "Your note has been saved!"})

    })

// ROUTE no.3 : updatinh existing notes on user entered query
router.put('/updatenotes/:id', verifyToken, [body('title', "Title is required").isLength({ min: 1 })],
    async (req, res) => {
        const { title, tag, description } = req.body
        const errors = validationResult(req)
        if (!errors.isEmpty()) return res.status(400).send(errors.array())

        // verifing if this user owns this notes
        const respectedNote = await Notes.findById(req.params.id)
        if (!respectedNote) return res.status(403).send("Access denied")

        // creating an independent new note object and updating the requesting note with it
        try {
            const newNote = {}
            if (title) newNote.title = title
            if (tag) newNote.tag = tag
            if (description) newNote.description = description

            const updateNote = await respectedNote.updateOne(req.body, newNote)
            res.send(updateNote)
        }
        catch (error) {
            console.log(error)
            res.status(500).send("Error 500\nSome error occurred in server")
        }
    })

// ROUTE no.4 : deleting notes based on user query form database
router.delete('/delete/:id', verifyToken,
    async (req, res) => {
        const errors = validationResult(req)
        if (!errors.isEmpty()) return res.status(400).send(errors.array())

        try {

            // verifying if this user owns the note
            const respectedNote = await Notes.findById(req.params.id)
            console.log(respectedNote)
            console.log(req.user)
            if(!respectedNote) return res.status(404).send("not found")

            // const noteUser = await User.findById(req.user)
            // if (noteUser._id !== req.user.id) return res.status(403).send("Access denied")

            // finding and deleting the note
            await Notes.deleteOne(respectedNote)
            .then(console.log("Data successfully deleted"))
            res.send("Your note deleted successfully!")
        }
        catch (error) {
            console.log(error)
            res.status(500).send("Error 500\nSome error occured in the server")
        }
    })

module.exports = router