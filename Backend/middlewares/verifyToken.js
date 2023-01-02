const jwt = require('jsonwebtoken');
const JWT_TOKEN = "shhThisIsSecretSignString"

const verifyToken = (req, res, next) => {
    const token = req.header('token')
    if (!token || token === undefined) return res.status(401).send('Access denied\nInvalid autentication token')
    try {
        // const v_token = token.split(' ')[1]
        const verified = jwt.verify(token, JWT_TOKEN)
        if (!verified) return res.status(401).send('Access denied\nInvalid autentication token')
        req.user = verified
    }
    catch (error) {
        console.log(error)
        res.status(500).send("some error occurred in the server response")
    }

    next()
}

module.exports = verifyToken