const express = require('express');
const router = express.Router()
const { body, validationResult } = require('express-validator');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const verifyToken = require('../middlewares/verifyToken')
const User = require('../models/User')

const JWT_TOKEN = "shhThisIsSecretSignString"

//ROUTE no. 1 : to authenticate the user and storing user's validated credentials
router.post('/signup', [
    body('name').isLength({ min: 3 }),
    body('email').isEmail(),
    body('password').isLength({ min: 4 })
],
    async (req, res) => {
        const {name, email, password, date} = req.body
        // returning bad request if error occurs in validation
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json(errors.array()[0].msg);
        }

        try {
            // checking if the user already exists with the same email or password
            if (await User.findOne({email: email})) return res.status(409).send("This email is already in use")
            // hashing the password with bcrypt npm pachage
            const securePass = await bcrypt.hash(password, bcrypt.genSaltSync(10))
            // returning a new user promise and storing it to the darabase
            const newUser = await User.create({
                name: name,
                email: email,
                password: securePass,
                date: date,
            })
                .catch((err) => res.send(err))
            let data = {
                id: newUser.id
            }
            const authToken = jwt.sign(data, JWT_TOKEN)
            res.send(authToken)
            console.log("The user has been signed in successfully")
            console.log(newUser.id)
        }
        catch (error) {
            console.log(error)
            res.status(500).send("Error 500\nSome error occurred in server")
        }
    })

//ROUTE no. 2 : authentaicating user to login to the server
router.post('/login', [
    body('email').isEmail(),
    body('password').isLength({ min: 4 })
],
    async (req, res) => {
        // returning bad request error if any error occurs in validation
        const errors = validationResult(req)
        if (!errors.isEmpty()) {
            return res.status(400).json(errors.array())
        }

        // comparing email and password entered to give the user login auth token
        const { email, password } = req.body

        const user = await User.findOne({ email: email })
        if (!user) return res.status(404).send("Please login with correct email")

        const passCompare = await bcrypt.compare(password, user.password)
        if (!passCompare) return res.status(400).send("Please login with correct password")
        const payload = {
            id: user.id
        }
        const authToken = jwt.sign(payload, JWT_TOKEN)
        res.send(authToken)
        console.log("\nYou have successfully logged in!")
        const data = jwt.verify(authToken, JWT_TOKEN)
        console.log(data.id)
    })

// ROUTE no. 3 : to get all user account details
router.get('/account', verifyToken,  async (req, res)=>{
    try{
        if(!req.user.id) return res.send("error")
        const userDetails = await User.findById(req.user.id).select({password: 0})
        if(!userDetails) return res.status(401).send('invalid json token')
        res.send(userDetails)
    }
    catch(error){
        console.log(error)
        res.status(500).send("Error 500\n Some error occurred in the server")
    }
})

module.exports = router