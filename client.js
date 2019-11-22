const client =require('socket.io-client');

const socket = client.connect('http://localhost:8080');
socket.on('news', function (data) {
    console.log('connected');
    socket.emit('my other event', { my: 'data' });
  });
  socket.on('connect', function(socket) {
      console.log('Connected!');
  });