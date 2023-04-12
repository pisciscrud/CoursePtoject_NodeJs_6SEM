const {Server} = require('socket.io');

//set up socket server on 8088 port . It's socket.io server
const webSocketServer = new Server(9000, {
    cors: {
        origin: "*",
        methods: ["GET", "POST"]
    },
    allowEIO3: true
});


module.exports = webSocketServer;