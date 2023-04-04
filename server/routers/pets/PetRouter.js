const express = require('express');
const uuid = require('uuid');
const path = require('path');

const PetService = require('./PetService');
const roleMiddleware = require("../../middlewares/roleMiddleware");

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

petRouter.post('/add',roleMiddleware(["user"]),async(req,res,next) =>{

    try {
        const idUser=req.userId;
        const {nickname,pet_type_id,age}=req.body;
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