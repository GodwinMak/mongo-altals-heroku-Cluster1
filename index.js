const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
// const http = require("http")

const userRoutes = require('./routes/UserRoutes')
const messageRoute = require("./routes/messageRoute")


const app = express();
const  socket = require("socket.io");

require('dotenv').config();



app.use(cors());
app.use(express.json());

app.use("/api/auth",userRoutes);
app.use("/api/messages", messageRoute);

app.get('/', (req, res) => {
    res.send('Hello, World! how are you');
});


const PORT = process.env.PORT || 5000

// app.use(userRoutes);
// const sever =http.createSever(app);
// const io = socketio(sever);
// io.on('connect', (socket)=>{console.log("we have a connection") socket.on("disconnect", ()=>{console.log(No connection)})})
// sever.listen(PORT, ()=>console.log(`Sever Starting on PORT ${PORT}`));


mongoose.connect(process.env.MONGO_URL, {
    useNewUrlParser: true,
    useUnifiedTopology: true,

}).then(()=>{
    console.log("DB connection Successfull")
}).catch((error)=>{
    console.log(error.message)
});



const server = app.listen(process.env.PORT,()=>{
    console.log(`Server started on port ${process.env.PORT}`)
});

const io = socket(server,{
    cors:{
        origin: "http://localhost:3000",
        credential: true,
        optionSuccessStatus:200
    }
});

global.onlineUsers = new Map();
io.on("connection", (socket) => {
  global.chatSocket = socket;
  socket.on("add-user", (userId) => {
    onlineUsers.set(userId, socket.id);
  });

    socket.on("send-msg", (data) => {
    const sendUserSocket = onlineUsers.get(data.to);
    if (sendUserSocket) {
      socket.to(sendUserSocket).emit("msg-recieve", data.msg);
    }
  });
});