const express = require('express');
const uuid = require('uuid');
const path = require('path');
const masterRouter = express.Router();

const MasterService = require("./masterService")
const roleMiddleware = require("../../middlewares/roleMiddleware");
const multer = require("multer");


const masterService = new MasterService();

const upload = multer({ dest: 'static/' });
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


masterRouter.post('/add',roleMiddleware(["admin"]),upload.single('image') ,async (req,res,next) =>
{
    try {

        const {name_master,surname_master,description,Master_to_Procedure} = req.body;
        console.log(req.body);


        let photo_master = req.file.filename;

        const master = await masterService.addMaster(name_master,surname_master,description,photo_master,Master_to_Procedure);
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