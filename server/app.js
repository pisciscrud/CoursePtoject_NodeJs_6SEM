const express = require('express');

const bodyParser = require('body-parser');
const authRouter= require('./routers/auth/authRouter')

const fileUpload = require('express-fileupload');
const masterRouter = require('./routers/masters/masterRouter')
const procedureRouter = require('./routers/procedures/procedureRouter')
const petsRouter = require('./routers/pets/PetRouter');
const scheduleRouter= require('./routers/schedule/scheduleRouter')
const commentsRouter=require('./routers/Comments/CommentRouter')
const createWebSocketServer = require('./ws/websocket');
const http = require("http");
// const {initWS} = require("./ws/websocket");
const {Server} = require("socket.io");
const {initWS} = require("./ws/websocket");

const app = express();
const httpServer = http.createServer(app);

app.use(require('cors')());

app.use(express.json());
app.use(express.static(__dirname + '/static'));
app.use(fileUpload({}))

app.use(bodyParser.urlencoded({extended:false}));
app.use(bodyParser.json());

app.use('/api/auth',authRouter);
app.use('/api/masters', masterRouter);
app.use('/api/procedures',procedureRouter);
app.use('/api/pets',petsRouter);
app.use('/api/schedule',scheduleRouter);
app.use('/api/comments',commentsRouter);

initWS(httpServer)
httpServer.listen(5000,()=>{console.log("Server starts on 5000")})
