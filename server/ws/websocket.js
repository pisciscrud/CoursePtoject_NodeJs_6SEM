
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

    // io.on("disconnect", () => {
    //             console.log("🔥: A user disconnected");
    //        });

    // io.on("new-notification", (socket) => {
    //     console.log(`⚡: ${socket.id} user just connected!`);
    //     const token = socket.handshake.auth.token // read JWT token from auth object
    //     console.log(socket.handshake);
    //     const decoded = jwt.verify(token, process.env.SECRET_KEY) // verify token
    //     const userId = decoded.id // extract user ID from decoded token
    //
    //     // set the userId property on the socket object
    //     socket.userId = userId
    //
    // })
    //     socket.on("disconnect", () => {
    //        // console.log("🔥: A user disconnected");
    //     });
    //
    //     socket.on("message", (message) => {
    //         console.log("get message:", message);
    //     });
    // });

    _io = io
   // console.log('init: my _io:', _io)
}

function getWS() {
    //console.log('get: _io:', _io)
    return _io;
}

async function emitNotification(io, userId, notification)
{


   // console.log(io.sockets.sockets)
   //  const sockets = await io.in(`user_${userId}`).allSockets();
   //   // console.log(sockets)
   //  if (sockets.size > 0) {
   //      sockets.forEach(socketId => {
   //          io.to(socketId).emit('new-notification', notification);
   //      });
   //  }

        //const socket = io.sockets.sockets.find(socket => socket.userId === userId)
        //  console.log('socket',socket)
        // if (socket) {
        //     socket.to(socket.userId).emit('new-notification', notification)
        //    // socket.emit('new-notification', notification)
        // }

}


module.exports = { initWS, getWS,emitNotification, allSockets }