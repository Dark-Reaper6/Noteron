const express = require('express')
const cors = require('cors')
const connectToMongo = require('./db.js')
const path = require('path')
const server = express()
const port = 3027
connectToMongo()

server.use(cors())
server.use(express.json())
server.use('/api', require(path.join(__dirname, './routes/authentication')))
server.use('/api', require(path.join(__dirname, './routes/notes')))

server.get('/', (req, res)=>{
  res.send("Welcome to home page of My Notes website")
})

server.listen(port, () => {
  console.log(`Example server listening on port http://localhost:${port}`)
})