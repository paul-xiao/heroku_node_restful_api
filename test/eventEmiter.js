const EventEmitter = require('events');

class MyEmitter extends EventEmitter {
}

const myEmitter = new MyEmitter();
myEmitter.on('event', (a, b) => {
    console.log(a, b, this);
    // 打印: a b {}
  });
  myEmitter.emit('event', 'a', 'b');
