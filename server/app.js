const express = require('express');
const fs = require("fs");
const bodyParser = require('body-parser');
const authRouter= require('./routers/auth/authRouter')
const masterRouter = require('./routers/masters/masterRouter')
const procedureRouter = require('./routers/procedures/procedureRouter')
const petsRouter = require('./routers/pets/PetRouter');
const scheduleRouter= require('./routers/schedule/scheduleRouter')
const commentsRouter=require('./routers/Comments/CommentRouter')
const notificationRouter=require('./routers/notification/NotificationRouter')
const https = require("https");
const {initWS} = require("./ws/websocket");

const key = fs.readFileSync('./encryption/LAB.key');
const cert = fs.readFileSync('./encryption/LAB.crt');

const options = {
    key: key,
    cert: cert
};
const app = express();
const httpsServer = https.createServer(options,app)

app.use(require('cors')());

app.use(
    bodyParser.urlencoded({
        extended: true,
    })
);
app.use(bodyParser. text({type: '/'}));
app.use(express.json());
app.use(express.static(__dirname + '/static'));
//app.use(fileUpload({}))

//app.use(bodyParser.urlencoded({extended:false}));
app.use(bodyParser.json());

app.use('/api/auth',authRouter);
app.use('/api/masters', masterRouter);
app.use('/api/procedures',procedureRouter);
app.use('/api/pets',petsRouter);
app.use('/api/schedule',scheduleRouter);
app.use('/api/comments',commentsRouter);
app.use('/api/notifications',notificationRouter)

initWS(httpsServer)
httpsServer.listen(5000,()=>{console.log("Server starts on 5000")})
