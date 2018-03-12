const path = require('path')
const express = require('express')
const app = express()
const PORT = process.env.PORT || 3000
const db = require('./db')
const socketio = require('socket.io')
module.exports = app

const createApp = () => {
  // static file-serving middleware
  app.use(express.static(path.join(__dirname, '..', 'public')))

  // any remaining requests with an extension (.js, .css, etc.) send 404
  app.use((req, res, next) => {
    if (path.extname(req.path).length) {
      const err = new Error('Not found')
      err.status = 404
      next(err)
    } else {
      next()
    }
  })

  // sends index.html
  app.use('*', (req, res) => {
    res.sendFile(path.join(__dirname, '..', 'public/index.html'))
  })

  // error handling endware
  app.use((err, req, res, next) => {
    console.error(err)
    console.error(err.stack)
    res.status(err.status || 500).send(err.message || 'Internal server error.')
  })
}

const startListening = () => {
  // start listening (and create a 'server' object representing our server)
  const server = app.listen(PORT, () => console.log(`Mixing it up on port ${PORT}`))

  // set up our socket control center
  const io = socketio(server)

  io.on('connection', function(socket){
    socket.on('SEND_MESSAGE', function(data){
      io.emit('RECIEVE_MESSAGE', data)
  })
});

}
if (require.main === module) {
    createApp()
    startListening()
} else {
  createApp()
}