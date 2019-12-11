//package to generate sessions in Express
const session = require('express-session')

//to store session data inside our database
const MongoStore = require("connect-mongo")(session);

//UUIDs generator (Universally unique identifier)
//v4 => version 4
const uuid = require('uuid/v4')

const mongoose = require('mongoose')

//if "npm run dev", it will create an ID
const sessionSecret = process.env.NODE_ENV === 'dev' ? uuid() : process.env.SECRET_SESSION

if (!sessionSecret) throw new Error('Env var SECRET_SESSION not found or invalid')

module.exports = session({
  secret: sessionSecret,
  cookie: { 
    maxAge: 24 * 60 * 60 * 1000 // 1 day
  },
  store: new MongoStore({
    mongooseConnection: mongoose.connection,
    ttl: 24 * 60 * 60 // 1 day
  })
})