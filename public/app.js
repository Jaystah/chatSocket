const socket = io();


let name2;
socket.on('setName',obj=>{
    document.getElementById('name').innerText = `Name: ${obj}`;
})
do{
    name2 = prompt('Geef je naam')
}while(!name2)

M.toast({html: `Welcome ${name2}!`, classes: 'rounded'});
setTimeout(socket.emit('nameConfig',name2),4000);
const sendMessage = (msg)=>{
document.getElementById('msg').value = "";
display({
    message: msg,
    name2: "You"
},'me')

let mess= {
    message : msg,
    name2
}

socket.emit('newMsg',mess);
}


socket.on('sendToAll',msg=>{
    display(msg,'other');
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


socket.on('newJoin',obj=>{
    M.toast({html: `${obj} joined the party!`, classes: 'rounded'});
})

const display = (msg,type)=>{
    let place = document.getElementById('messages');
    let paragraph = document.createElement("P");
    paragraph.innerHTML = type == 'me' ? "<b class='msgName'>"+msg.name2 + "</b> - <span class='msgMessage'>" + msg.message + "</span>" : "<b style='color: red;'>"+msg.name2 + "</b> - <span class='msgMessage'>" + msg.message + "</span>";
    place.prepend(paragraph);
}
const left = (msg)=>{
    let place = document.getElementById('messages');
    let paragraph = document.createElement("P");
    paragraph.innerHTML = msg + " left the party";
    place.appendChild(paragraph);

}

document.addEventListener('keyup', (e) => {
    e.preventDefault();
    if (e.keyCode === 13)      
        sendMessage(document.getElementById('msg').value);
  });