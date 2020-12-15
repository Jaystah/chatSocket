const socket = io();


let name2;

do{
    name2 = prompt('Geef je naam')

    socket.emit('nameConfig',name2);
}while(!name2)

const sendMessage = (msg)=>{

display({
    message: msg,
    name2: "You"
})

let mess= {
    message : msg,
    name2
}

socket.emit('newMsg',mess);
}


socket.on('sendToAll',msg=>{
    display(msg);
})
socket.on('left',msg=>{
    left(msg);
})

setInterval(()=>{
socket.emit("getCounter")
},100);

clearInterval();

socket.on('onliners',amount=>{
  amount == 1 ? document.getElementById("count").innerHTML = amount + " chatter is online" :    document.getElementById("count").innerHTML = amount + " people are online"
})

const display = (msg)=>{
    let place = document.getElementById('messages');
    let paragraph = document.createElement("P");
    paragraph.innerHTML = "<b>"+msg.name2 + "</b> sent " + msg.message;
    place.appendChild(paragraph);
}

const left = (msg)=>{
    let place = document.getElementById('messages');
    let paragraph = document.createElement("P");
    paragraph.innerHTML = msg + " left the party";
    place.appendChild(paragraph);

}