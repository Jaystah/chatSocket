const express = require('express');
const path = require('path');
const app = express();
const PORT = 5000;


app.use(express.static(path.join(__dirname, 'public')))

const http = require('http').createServer(app);

let counter = 0;
const io = require('socket.io')(http);
io.on('connect',socket=>{
    counter++;
    io.emit('onliners',counter);
    socket.emit('onliners',counter);

    socket.on('nameConfig',(e)=>{
        socket.name = e;

        socket.emit("setName",e);

        socket.broadcast.emit('newJoin',e);
    })

    socket.on('getCounter',()=>{
        socket.emit('onliners',counter);
    })

    socket.on('newMsg',msg=>{
        console.log(msg);
        socket.broadcast.emit('sendToAll',msg);
    })
    socket.on('disconnect', function(){
        counter--;
        socket.broadcast.emit('left',socket.name ? socket.name :'Someone');
        io.emit('onliners',counter)
    });


})



http.listen(PORT,()=>{
    console.log('Server running on', PORT);
})