
var app=require('express')()
var http=require('http').createServer(app)
var io=require('socket.io')(http)

const users={}

io.on('connection',socket=>{
    
    socket.on('new-user-joined',name=>{
        console.log('new user joined:',name)
        users[socket.id]=name;
        socket.broadcast.emit('user-joined',name)
         
    });

    socket.on('send',message=>{
        socket.broadcast.emit('receive',{message:message,name:users[socket.id]});
    })

})

app.get('/', (req, res) => {
    res.send("Node Server is running. Yay!!")
})

http.listen(process.env.PORT || 5000);
