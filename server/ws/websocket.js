const io = require("socket.io");
const {Server} = require("socket.io");

let _io = null;

function initWS(http) {
    const io = new Server(http, {
        cors: {
            origin: '*'
        }
    });

    io.on("connection", (socket) => {
        //console.log(`⚡: ${socket.id} user just connected!`);

        socket.on("disconnect", () => {
           // console.log("🔥: A user disconnected");
        });

        socket.on("message", (message) => {
            console.log("get message:", message);
        });
    });

    _io = io
   // console.log('init: my _io:', _io)
}

function getWS() {
    //console.log('get: _io:', _io)
    return _io;
}

module.exports = { initWS, getWS }