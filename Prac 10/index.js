const moment = require('moment'); 
const express = require("express"); 
const app = express();
const server = require("http").createServer(app);
const io = require("socket.io")(server); 

app.use(express.static("public"));

io.on("connection", socket => {
  let username = "anonymous";

  
  socket.on("chat message", message => {
    let time  = moment().format('h:mm:ss a');

    io.emit("chat message", {username, message,time});
  });
  
  socket.on("register username", newUsername => {
    username = newUsername;
  });
});

server.listen(3000, () => console.log("server listening on port 3000"))