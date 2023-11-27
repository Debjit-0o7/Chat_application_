const io = require('socket.io')(3001)

const user={}

io.on('connection',socket => {
    socket.on('new_user_join', name =>{
        user[socket.id]=name;
        const times= new Date().toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit' });
        socket.broadcast.emit('USER_joined',{name,times});
    });

    socket.on('send', massage =>{
        const times = new Date().toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit' });
        socket.broadcast.emit('recive',{massage: massage,name : user[socket.id],times } );
    });

    socket.on('disconnect', massage =>{
        const times = new Date().toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit' });
        socket.broadcast.emit('leave',{name:user[socket.id],times});
        delete user[socket.id];
    });

})