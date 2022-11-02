'use strict'

const express = require('express')
const morgan = require('morgan')
const createError = require('http-errors')
const http = require('http')
require('dotenv').config()

//Server Init
const app = express()
const server = http.createServer(app)

// logging
if (process.env.NODE_ENV === 'dev') app.use(morgan('dev'))
  
// Parse only urlencoded bodies.
app.use(express.urlencoded({ extended: true }))
  
  
app.use( express.json())

app.post('/post', (req, res, next) => {
    console.log(req.body)
    res.sendStatus(200)
})

// Default Error handling
app.use('*', (req, res, next) => next(createError(404)))

app.use((err, req, res, next) => {
    const error = {
      code: '404',
      title: 'whoops!',
      message: '404 - Page Not Found',
      subMessage: 'We could not find the page that you are looking for. For some reason it has been removed or moved',
      //img: '/img/404-error.jpg'
    }
    return res.status(404).render('errors/error', {error})
  
})

server.listen(process.env.PORT, () => {
  console.log(`Server started on ${process.env.HOST}:${process.env.PORT} and is running in ${process.env.NODE_ENV} mode`)
})
