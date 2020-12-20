const socket = io();

let allpeople = [];
let name2;
socket.on('setName', obj => {
    document.getElementById('name').innerText = `Name: ${obj}`;
})
do {
    name2 = prompt('Geef je naam')
} while (!name2);

M.toast({ html: `Welcome ${name2}!`, classes: 'rounded' });
setTimeout(socket.emit('nameConfig', name2), 4000);
const sendMessage = (msg) => {
    if (msg) {
        document.getElementById('msg').value = "";
        display({
            message: msg,
            name2: "You"
        }, 'me')

        let mess = {
            message: msg,
            name2
        }

        socket.emit('newMsg', mess);
    }
}


socket.on('sendToAll', msg => {
    display(msg, 'other');
})

socket.on('left', msg => {
    left(msg);
})

setInterval(() => {
    socket.emit("getCounter")
}, 100);

clearInterval();

socket.on('onliners', amount => {
    amount == 1 ? document.getElementById("count").innerHTML = amount + " chatter is online" : document.getElementById("count").innerHTML = amount + " people are online"
})


socket.on('allPeople', object => {
    if (allpeople != object) {
        clearBox('people');
        object.forEach((i) => {
            let p = document.createElement('li');
            p.innerHTML = i;
            p.className = "collection-item";
            document.getElementById('people').prepend(p);
        })
    }
})

socket.on('newJoin', obj => {
    M.toast({ html: `${obj} joined the party!`, classes: 'rounded' });
})

const display = (msg, type) => {
    let place = document.getElementById('messages');
    let paragraph = document.createElement("P");
    paragraph.innerHTML = type == 'me' ? "<b class='msgName'>" + msg.name2 + "</b> - <span class='msgMessage'>" + msg.message + "</span>" : "<b style='color: red;'>" + msg.name2 + "</b> - <span class='msgMessage'>" + msg.message + "</span>";
    paragraph.style.display = "none";
    $(paragraph).prependTo('#messages').show('slow');
}
const left = (msg) => {
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

const clearBox = (elementID) => {
    var div = document.getElementById(elementID);

    while (div.firstChild) {
        div.removeChild(div.firstChild);
    }
}

socket.on('playGhetto', () => {
    if (document.getElementById('ghetto').paused)
        playGhetto();
})
socket.on('pauseGhetto', () => {
    if (!document.getElementById('ghetto').paused)
        pauseGhetto();
})
socket.on('playKurt', () => {
    if (document.getElementById('kurt').paused)
        playKurt();
})
socket.on('pauseKurt', () => {
    if (!document.getElementById('kurt').paused)
        pauseKurt();
})

const playGhetto = () => {
    document.getElementById('ghetto').play();
    socket.emit('getTime', (document.getElementById('ghetto').currentTime, document.getElementById('kurt').currentTime))
    socket.emit('playGhetto');
    document.getElementById('playKurtButton').classList.add('disabled')

}
const pauseGhetto = () => {
    document.getElementById('ghetto').pause();
    socket.emit('pauseGhetto')
    document.getElementById('playKurtButton').classList.remove('disabled')

}
const playKurt = () => {
    document.getElementById('kurt').play();
    socket.emit('getTime', (document.getElementById('ghetto').currentTime, document.getElementById('kurt').currentTime))
    socket.emit('playKurt')
    document.getElementById('playGhettoButton').classList.add('disabled')
}
const pauseKurt = () => {
    document.getElementById('kurt').pause();
    socket.emit('pauseKurt')
    document.getElementById('playGhettoButton').classList.remove('disabled')
}

const goTo = (link) => {
    window.open(link);
}


if(a>b){
    a = 1;
}else{
    a = 2;
}




