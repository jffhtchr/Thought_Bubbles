const path = require('path');
const express = require('express');
const app = express();
const PORT = process.env.PORT || 3000;
const db = require('./db'); 
const socketio = require('socket.io');

app.use(express.static(path.join(__dirname, '../public')))

const server = app.listen(PORT, function () {
      console.log(`Listening on port ${PORT}`);
});
    
var io = socketio(server);

io.on('connection', function(socket){
    socket.on('SEND_MESSAGE', function(data){
      io.emit('RECIEVE_MESSAGE', data)
  })
});

app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(err.status || 500).send(err.message || 'Internal server error');
  });