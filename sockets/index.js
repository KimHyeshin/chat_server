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
      console.log('name : ' + name)
      if (mapIdName.hasOwnProperty(id)) {
        const ret = { code: 1, name: mapIdName[id], message: `already socket_id : ${id}` }
        socket.emit('enter', ret)
        console.log(ret)
      } else if (mapNameId.hasOwnProperty(name)) {
        const ret = { code: 2, message: `already user_name : ${name}` }
        socket.emit('enter', ret)
        console.log(ret)
      } else {
        mapNameId[name] = id
        mapIdName[id] = name
        console.log(`new user(${name}) : ${id}`)
        const msg = `[${new Date().format('HH:mm:ss')}] '${name}' 님이 입장하였습니다.`
        const ret = { code: 0, name, message: msg }
        socket.emit('enter', ret)
        socket.broadcast.emit('sendAll', msg)
      }
    })
    socket.on('sendAll', (msg) => {
      const id = socket.id
      const ret = `[${new Date().format('HH:mm:ss')}] ${mapIdName[id]} : ${msg}`
      socket.emit('sendAll', ret)
      socket.broadcast.emit('sendAll', ret)
    })
    socket.on('disconnect', (s) => {
      const id = socket.id
      const name = mapIdName[id]
      console.log(`disconnected user : ${name}`)
      delete mapNameId[name]
      delete mapIdName[id]
    })
  });
}
