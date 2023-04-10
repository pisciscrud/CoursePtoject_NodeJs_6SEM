const express = require('express');
const uuid = require('uuid');
const path = require('path');
const procedureRouter = express.Router();

const ProcedureService=require("./procedureService")
const roleMiddleware = require("../../middlewares/roleMiddleware");

const procedureService=new ProcedureService();


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



procedureRouter.post('', roleMiddleware(["admin"]),async(req,res,next)=>
{
  try {
      const {name_procedure, Price, description,Procedure_to_pet} = req.body;
      console.log(Procedure_to_pet);
      const {img} = req.files;
      let procedure_photo = uuid.v4() + ".png";
      img.mv(path.resolve(__dirname, '../..', 'static', procedure_photo));
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


procedureRouter.get('/bytype/:id',async (req,res,next)=>{
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