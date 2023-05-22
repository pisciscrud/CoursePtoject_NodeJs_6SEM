
const {Server} = require("socket.io");
const jwt = require('jsonwebtoken');

let _io = null;

 const allSockets = []


function initWS(https) {

  const  io = new Server(https, {
        cors: {
            origin: '*'
        }
    });



    

    io.on('connection', (socket) => {

      
     socket.on('subscribe', data => {
        const userId = data.userId;

        const existingUserIdIndex = allSockets.findIndex(item => item.userId = userId);
        if(existingUserIdIndex === -1) {
            allSockets.push({ userId, socket })
        }
        else {
            allSockets[existingUserIdIndex].socket = socket;
        }
        
    })

    })



    _io = io
   // console.log('init: my _io:', _io)
}

function getWS() {
    //console.log('get: _io:', _io)
    return _io;
}




module.exports = { initWS, getWS, allSockets }