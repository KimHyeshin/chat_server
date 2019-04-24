
module.exports = function(io){
  io.on('connection', function(socket){
    socket.on('sendMsg', (msg) => {
      const ret = `[${new Date().format('HH:mm:ss')}] : ${msg}`
      socket.emit('sendMsg', ret)
    })
    socket.on('disconnect', (s) => {
      console.log(`disconnected`)
    })
  });
}