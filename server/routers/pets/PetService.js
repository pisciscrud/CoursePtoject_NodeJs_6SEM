const jwt = require('jsonwebtoken');
const createError = require("http-errors");
const PetRepository = require("./PetRepository");

class PetService
{
    constructor() {
        this.petRepository =  new PetRepository();
    }

   async getPetTypes()
   {
       try
       {
           return this.petRepository.GetPetTypes()

       }
       catch (e)
       {

       }

   }
    async getPetsOfUser(idUser)
    {
        try {
            return this.petRepository.findPetsOfUser(idUser);
        }
        catch (e)
        {

        }
    }


    async addPet(pet_type_id,age,idUser,nickname)
    {
        try
        {
            return this.petRepository.Add(pet_type_id,age,idUser,nickname);
        }
        catch (e)
        {

        }
    }

    async deletePet(idPet,idUser)
    {
        try
        {
            return this.petRepository.Delete(idPet);
        }
        catch(e)
        {

        }
    }

}

module.exports=PetService;