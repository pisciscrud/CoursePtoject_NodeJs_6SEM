const express = require('express');

const {DbClient} = require("../../Db/DbClient");

const createError = require("http-errors");

class PetRepository
{
    constructor() {

        this.prismaClient=DbClient;
    }


    async findPetsOfUser(idUser) {
        try {
            {
               const pets = await this.prismaClient.Pet.findMany(
                   {
                       where : {
                           id_owner :idUser
                       }
                   }
               )

                return pets;
            }
        }
        catch (e)
        {
            throw createError(500,"Db Error"+e.message);
        }
    }

    async Add (pet_type_id,age,idUser,nickname)
    {
        try {
            const pet = await this.prismaClient.Pet.create({
                data : {
                    pet_type_id,
                    age,
                    id_owner: idUser,
                    nickname
                }
            })
            return pet;
        }
        catch (e)
        {
            throw createError(500,"Db Error"+e.message);
        }
    }

    async Delete(idPet)
    {
        try
        {
            const pet = await this.prismaClient.Pet.delete({
                where :{
                    id:idPet
                }
            })
        }
        catch (e)
        {
            throw createError(500,"Db Error"+e.message);
        }
    }
}


module.exports=PetRepository;