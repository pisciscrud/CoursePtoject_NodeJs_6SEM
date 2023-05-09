const express = require('express');
const uuid = require('uuid');
const path = require('path');
const fs = require('fs')
const multer = require('multer');
const bodyParser = require('body-parser');




const procedureRouter = express.Router();

const ProcedureService=require("./procedureService")
const roleMiddleware = require("../../middlewares/roleMiddleware");

const procedureService=new ProcedureService();
const upload = multer({ dest: 'static/' });
//procedureRouter.use(bodyParser.urlencoded({ extended: true }));

procedureRouter.get('',async (req,res,next)=>{
    try
    {

        const procedures = await procedureService.getAllMasters();
        res.json(procedures)


    }
    catch (e) {

        next(e);

    }
})

procedureRouter.put('/:id',roleMiddleware(["admin"]),upload.single('image'),async (req,res,next)=>
{
    try
    {

        let result ;

        const {id, name_procedure, Price, description, procedure_photo1} = req.body;

        if ( procedure_photo1 === undefined)
        {
            const procedure_photo=req.file.filename;
            console.log(procedure_photo);
            const updateProcedure= await procedureService.updateProcedure(id, name_procedure, Price, description, procedure_photo)
            result = updateProcedure;
        }
       else
        {
            const updateProcedure= await procedureService.updateProcedure(id, name_procedure, Price, description, procedure_photo1)
            result = updateProcedure;

        }

      //  const updateProcedure= await procedureService.updateProcedure(id, name_procedure, Price, description, procedure_photo)
        res.json(result);
    }
    catch (e) {

        next(e);

    }
})



procedureRouter.post('', roleMiddleware(["admin"]),  upload.single('image') , async(req,res,next)=>
{
  try {

     console.log('body',req.body);
      const {name_procedure, Price, description,Procedure_to_pet} = req.body;
   console.log('files',req.file.filename)
        const procedure_photo=req.file.filename;

    //  console.log('img',img)
    //   // let procedure_photo = uuid.v4() + ".png";
    //   // img.mv(path.resolve(__dirname, '../..', 'static', procedure_photo));
      const procedure = await procedureService.createProcedure(name_procedure, Price, description, procedure_photo,Procedure_to_pet);

      return res.json(procedure);
  }
  catch (e)
  {
      next(e);
  }
})

procedureRouter.delete('/:id',roleMiddleware(["admin"]), async (req,res,next)=>
{

    try {
        const {id} = req.params;
        const procedure = await procedureService.deleteProcedure(id);
        return res.json(procedure);
        }
        catch (e)
    {
        next(e);
    }
})

procedureRouter.get('/mastersAndProcedures',
    async (req,res,next)=> {

        try {

            const connections = await procedureService.masterAndProcedures();
            res.json(connections);
        } catch (e) {
            next(e);
        }
    }
    )


procedureRouter.get('/mastersAndProcedures/:id',async (req,res,next)=>
{
    try
    {
        const {id}=req.params;
        const connections = await procedureService.mastersOfProcedure(id);
        res.json(connections);

    }
    catch (e) {
        next(e);
    }
})


procedureRouter.get('/byType/:id',async (req,res,next)=>{
    try
    {
        const {id}=req.params;

        const connections = await procedureService.getProceduresByType(Number(id));
        res.json(connections);
    }
    catch(e)
    {
        next(e);
    }
})

procedureRouter.get('/types/:id',async (req,res,next)=>
{
    const {id}=req.params;
    const connections = await procedureService.getTypeForProcedure(id);
    res.json(connections);
})


procedureRouter.get('/petsOfUser/:id',roleMiddleware(["user"]),async (req,res,next)=>

{
    try {
        const {id} = req.params;
        const idUser = req.userId;
        const pets = await procedureService.getPetForProcedure(id, idUser);
        res.json(pets);
    }
    catch (e)
    {
        next(e);
    }
})

module.exports = procedureRouter