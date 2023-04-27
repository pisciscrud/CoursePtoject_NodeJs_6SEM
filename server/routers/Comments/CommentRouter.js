const express = require('express');
const uuid = require('uuid');
const path = require('path');
const commentRouter = express.Router();

const CommentService = require ("./CommentService")
const roleMiddleware = require("../../middlewares/roleMiddleware")
const {getWS} = require("../../ws/websocket");


const commentService = new CommentService();

commentRouter.get('/all',async (req,res,next)=>
{
    try
    {
        const comments = await commentService.getAllComments();
        res.json(comments)
    }
    catch (e) {

        next(e);

    }
})


commentRouter.post('/add',roleMiddleware (["user"]),async (req,res,next)=>
{
    const ws = getWS()
    try
    {
        const idUser= req.userId;
        const {date_, rating, content, master_id, procedure_id,record_id} =req.body;
        console.log('record_id',record_id)
        const comment = await commentService.addComment(date_,rating, content, idUser, master_id, procedure_id,record_id);
        ws.emit('new-comment',{comment});
        res.json(comment);
    }
    catch (e)
    {
        next(e)
    }
})
module.exports = commentRouter