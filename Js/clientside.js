const socket= io('http://localhost:3001', { transports: ["websocket"]});


const form = document.getElementById('send-container');
const msginput = document.getElementById('msg')
const msgcontainer = document.querySelector(".container");

var audio = new Audio('tune.mp3');

const append= (massage,position)=>
{
    const msgElement = document.createElement('div');
    msgElement.innerText=massage;
    msgElement.classList.add('massages');
    msgElement.classList.add(position);
    msgcontainer.append(msgElement);

    if(position=='left')
    {
        audio.play();
    }
}

form.addEventListener('submit', (e) =>{
    e.preventDefault();
    const masg= msginput.value;
    append(`You: ${masg}`,'right');
    socket.emit('send',masg);
    masg=' ';
})

const names= prompt("Enter your name to join: ");
document.getElementById("lname").innerHTML =names;
socket.emit('new_user_join', names);


socket.on('USER_joined', data =>{
    append(` ${data.name} join the chat at ${data.times}`,'right');
})

socket.on('recive', data =>{
    append(`${data.name}(${data.times}): ${data.massage}  `,'left');
})

socket.on('leave', data =>{
    append(` ${data.name} left the chat at ${data.times}`,'right');
})
