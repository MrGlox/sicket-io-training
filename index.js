const express = require('express');

const app = express();
const http = require('http').createServer(app).listen(3000);

const io = require('socket.io')(http);

app.get('/', (req, res) => {
  res.sendFile(__dirname + '/home.html');
});

io.on('connection', (socket) => {
  console.log('Utilisateur connecté');
  io.emit('chat message', 'Someone just connected');

  socket.on('disconnect', () => {
    console.log("Utilisateur s'est déconnecté");
  });

  socket.on('chat message', (msg) => {
    io.emit('chat message', msg);
  });

  socket.on('user typing', (msg) => {
    io.emit('user typing', msg); // msg = true / false
  });
});

// app.get('*', (req, res) => {
//   res.send('404');
//   res.sendStatus(404);
// });

app.use(express.static('public'));
