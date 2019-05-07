var mapNameId = {}
var mapIdName = {}

module.exports = function(io){
  io.on('connection', function(socket){
    socket.on('sendMsg', (msg) => {
      const ret = `[${new Date().format('HH:mm:ss')}] : ${msg}`
      socket.emit('sendMsg', ret)
    })
    socket.on('enter', (name) => {
      const id = socket.id
      if (mapIdName.hasOwnProperty(name)) {
        const ret = `already user_name : ${name}`
        socket.emit('enter', ret)
        console.log(ret)
      } else if (mapNameId.hasOwnProperty(id)) {
        const ret = `already user_id : ${id}`
        socket.emit('enter', ret)
        console.log(ret)
      } else {
        mapNameId[name] = id
        mapIdName[id] = name
        socket.emit('enter', false)
        console.log(`new user(${name}) : ${id}`)
        const ret = `[${new Date().format('HH:mm:ss')}] '${name}' 님이 입장하였습니다.`
        socket.emit('sendAll', ret)
        socket.broadcast.emit('sendAll', ret)
      }
    })
    socket.on('sendAll', (msg) => {
      const id = socket.id
      const ret = `[${new Date().format('HH:mm:ss')}] ${mapIdName[id]} : ${msg}`
      socket.emit('sendAll', ret)
      socket.broadcast.emit('sendAll', ret)
    })
    socket.on('disconnect', (s) => {
      console.log(`disconnected`)
    })
  });
}