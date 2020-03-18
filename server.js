const app = require("./app");
const server = require('http').createServer(app);
const io = require('socket.io')(server);
const { success } = require("./app/utils/logs")


// socket.io
io.on('connection', function (socket) {
    info('Client socket connected')
    socket.on('chat message', function(msg){
      io.emit('chat message', msg);
    });
    socket.on('typing', function(msg){
      io.emit('typing', msg);
    });
    socket.on('disconnect', function() {
        info('Client socket disconnected.');
    });
  });


server.listen(process.env.PORT || 8080, function () {
    var port = server.address().port;
    success("App now running on port", port);
});