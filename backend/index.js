// packages
import path from 'path'
import express from 'express'
import dotenv from 'dotenv'
import cookieParser from 'cookie-parser'
import UserRouts from './routes/UserRouts.js'

// utilities
import connectDB from './config/db.js'
dotenv.config()
const port = process.env.PORT || 5000
connectDB()
const server = express()

server.use(express.json())
server.use(express.urlencoded({extended: true}))
server.use(cookieParser())


//rutes

server.use('/api/users', UserRouts)

//server listen
server.listen(port, ()=>{
    console.log(`port run on port: ${port}`)
})