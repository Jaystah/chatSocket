const express = require('express');
const path = require('path');
const app = express();
const PORT =  process.env.PORT || 5000;


app.use(express.static(path.join(__dirname, 'public')))

const http = require('http').createServer(app);

let counter = 0;
let people = [];

let timeBitteGeh = 0;
let timeKurt = 0;
const io = require('socket.io')(http);
io.on('connect',socket=>{
    counter++;
    io.emit('onliners',counter);
    socket.emit('onliners',counter);
    console.log(timeBitteGeh,timeKurt);
    socket.on('nameConfig',(e)=>{
        socket.name = e;

        socket.emit("setName",e);

        socket.broadcast.emit('newJoin',e);

        people.push(e);

        io.emit('allPeople',people)
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
        people.splice(people.indexOf(socket.name),1)
        io.emit('allPeople',people);
    });

    // io.on('getTime',(bitte,kurt)=>{
    //     timeBitteGeh = bitte;
    //     timeKurt = kurt;
    //     console.log(timeBitteGeh,timeKurt)
    // })

    socket.on('playGhetto',()=>{
        socket.broadcast.emit('playGhetto')
    })
    socket.on('pauseGhetto',()=>{
        socket.broadcast.emit('pauseGhetto')
    })
    socket.on('playKurt',()=>{
        socket.broadcast.emit('playKurt')
    })
    socket.on('pauseKurt',()=>{
        socket.broadcast.emit('pauseKurt')
    })
})





http.listen(PORT,()=>{
    console.log('Server running on', PORT);
})