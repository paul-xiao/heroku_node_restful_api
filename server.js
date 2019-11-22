const app = require("./app");
const server = require('http').createServer(app);
const io = require('socket.io')(server);


// socket.io
io.on('connection', function (socket) {
    console.log('Client socket connected')
    socket.on('chat message', function(msg){
      io.emit('chat message', msg);
    });
    socket.on('typing', function(msg){
      io.emit('typing', msg);
    });
    socket.on('disconnect', function() {
        console.log('Client socket disconnected.');
    });
  });


server.listen(process.env.PORT || 8080, function () {
    var port = server.address().port;
    console.log("App now running on port", port);
});