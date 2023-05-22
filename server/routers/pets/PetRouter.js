const express = require('express');
const uuid = require('uuid');
const path = require('path');

const PetService = require('./PetService');
const roleMiddleware = require("../../middlewares/roleMiddleware");
const { body, validationResult } = require('express-validator');
const petRouter = express.Router();

const petService = new PetService();

petRouter.get('/petsOfUser',roleMiddleware(["user"]),async (req,res,next)=>
{
    try {

        const idUser= req.userId;
        const pets = await petService.getPetsOfUser(idUser);
        res.json(pets);
    }
    catch (e)
    {
        next(e);
    }
})

petRouter.get('/types',async (req,res)=>
{
    try
    {
        const types = await petService.getPetTypes();
        res.json(types)
    }
    catch (e)
    {
        next(e);
    }
})

petRouter.post('/add',roleMiddleware(["user"]),
[
   
    body('age').notEmpty().isNumeric().custom((value) => {
        if (value < 0 || value > 100) {
          throw new Error('Age must be a positive number');
        }
        return true;
    }),
  
],
async(req,res,next) =>{

    try {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
          return res.status(400).json({ errors: errors.array() });
        }
        const idUser=req.userId;
        const {pet_type_id,age,nickname}=req.body;
        const pet = await petService.addPet(pet_type_id,age,idUser,nickname);
        res.json(pet);



    }
    catch (e)
    {
  next(e);
    }

})

petRouter.delete('/:id',roleMiddleware(["user"]),async(req,res,next)=>
{
    try
    {


        const idPet=req.params.id;
        const idUser=req.userId;

        const pet = await petService.deletePet(idPet);
        res.json(pet);


    }
    catch(e)
    {
        next(e);
    }

})

module.exports = petRouter