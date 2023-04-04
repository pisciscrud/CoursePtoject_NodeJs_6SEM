const express = require('express');
const uuid = require('uuid');
const path = require('path');
const masterRouter = express.Router();

const MasterService = require("./masterService")
const roleMiddleware = require("../../middlewares/roleMiddleware");


const masterService = new MasterService();


masterRouter.get('', async (req, res, next) => {

    try {
        const masters = await masterService.getAllMasters();
        res.json(masters)
    } catch (e) {

        next(e);

    }

})

masterRouter.get('/:id', async (req, res, next) => {
    try {
        const id = req.params.id;
        const master = await masterService.getInfoAboutMaster(id);
        res.json(master);
    } catch (e) {
        next(e);
    }
})


masterRouter.post('/add',roleMiddleware(["admin"]),async (req,res,next) =>
{
    try {

        const {name_master,surname_master,description} = req.body;
        console.log(req.body);
        const {img} =req.files;

        let photo_master = uuid.v4() + ".png";
        img.mv(path.resolve(__dirname, '../..', 'static', photo_master));
        const master = await masterService.addMaster(name_master,surname_master,description,photo_master);
        res.json(master);


    }
    catch (e)
    {
        next(e);
    }
})


masterRouter.post('/connect',roleMiddleware(["admin"]),async (req,res,next) =>
{
    try {


        console.log(req.body);
        const {master_id, procedure_id} = req.body;
        const master = await masterService.connectMasterToProcedure(master_id, procedure_id);
        res.json(master);
    }
    catch (e)
    {
        next(e);
    }
})

masterRouter.delete('/:id',roleMiddleware(["admin"]),async(req,res,next)=> {
        try {
            const id = req.params.id;
            const master = await masterService.deleteMasterById(id);
            res.json(master);



        } catch (e) {
            next(e);
        }
})


masterRouter.put(':/id',async (req,res,next)=>{
    try
    {
        const id=req.params.id;
        const {name_master,surname_master,description} =req.body;
        const {img}=req.files;
        const master = await masterService.updateMasterById(id,name_master,surname_master,description,img);
        res.json(master);

    }
    catch(e)
    {
        next(e);
    }
})





module.exports = masterRouter