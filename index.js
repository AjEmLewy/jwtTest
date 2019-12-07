const express = require('express')
const bodyParser = require('body-parser')
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')


users = [
    {id: 1, name:'Maciej', password: '$2b$10$IOGZHAvPgPLQ25OtxQ/rDOGPat5y.GlYv4kwuVFhAaqvSANGQmGKi'},
    {id: 2, name:'Wojciech', password: '$2b$10$CLgrGmvRCARc/9A7cs8fKOguTU6aALZEw3nr/m97.0NiOS66w.9pC'},
    {id: 3, name:'Ala', password: '$2b$10$OeFcVClmpjDbuKGvP/bwxesOmb4Ve3fgsg2pvzTiTENT9ydsbpHOC'},
    {id: 4, name:'Aga', password: '$2b$10$.W0YwY7LCzBG9ndVDAKpxeLO01b/uNxnteiBWtKcAcqYL1ZKKP7KC'}
]

const {
    PORT= 3000,
    secret= 'testSecret'
} = process.env


const server = express()

server.use(bodyParser.urlencoded({extended:true}))
server.use(bodyParser.json())

server.post('/auth', async (req, res) => {
    const {user, password} = req.body
    console.log(user + " "+password)
    const userRow = users.find(u => u.name === user)
    const match = await bcrypt.compare(password,userRow.password)
    if (match)
    {
        return res.send(jwt.sign(userRow.id,secret))
    }
    res.send("dupa")
})

server.get('/', (req, res) => {
    const token = req.headers.authorization.split(' ')[1]
    const decoded = jwt.verify(token, secret)
    res.send(decoded)
})




server.listen(PORT, () => {console.log('witaj')})