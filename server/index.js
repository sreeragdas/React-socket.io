const express = require('express')

const app = express();
const http = require("http")
const {Server} = require('socket.io')
const cors =require('cors')
app.use(cors())
const server =http.createServer(app);
const io=new Server(server,{
cors:{
    origin:"http://localhost:1234",
    methods: ["get", "post"]
}
})

io.on('connection' ,(socket)=>{
console.log(`connection user:${socket.id}`)
socket.on("message_send " ,(data)=>{
    socket.broadcast.emit('receive_message' ,data)
})
})
server.listen(3001,()=>{
    console.log('server running')
})
