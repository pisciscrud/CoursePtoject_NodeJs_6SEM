const createError = require("http-errors");
const ProcedureRepository = require("../procedures/procedureRepository");


class ProcedureService{
    constructor()
    {
        this.procedureRepository=new ProcedureRepository();
    }


    async getAllMasters()
    {
        try
        {
            return this.procedureRepository.findAll();
        }
        catch(e)
        {

        }
    }


    async createProcedure(name_procedure,Price,description,procedure_photo,Procedure_to_pet)
    {
        try {

            return this.procedureRepository.createProcedure(name_procedure,Price,description,procedure_photo,Procedure_to_pet)

        }
        catch(e)
        {
             return e;
        }
    }

    async deleteProcedure(id)
    {

        try {
  return this.procedureRepository.deleteProcedure(id)
        }
        catch(e)
        {

        }
    }
    async masterAndProcedures()
    {
        try {
            return this.procedureRepository.connectionMastersAndProcedures()
        }
        catch(e)
        {

        }
    }
    async mastersOfProcedure(id)
    {
        try
        {
            return this.procedureRepository.findMastersByIdProcedure(id)
        }
        catch(e)
        {

        }

    }

    async getProceduresByType(id)
    {
        try
        {
            return this.procedureRepository.findProceduresByType(id);
        }
        catch(e)
        {

        }
    }

    async getTypeForProcedure(id_procedure)
    {

            try
            {
                return this.procedureRepository.findTypesByProcedure(id_procedure)
            }
        catch (e)
        {

        }


    }
    async getPetForProcedure(id_procedure,id_user)
    {
        try
        {
            return this.procedureRepository.findPetsOfUserByProcedure(id_user,id_procedure)
        }
        catch (e)
        {

        }
    }
    async updateProcedure (id, name_procedure, Price, description, procedure_photo)
    {
        try
        {
            return await this.procedureRepository.updateProcedure(id, name_procedure, Price, description, procedure_photo)
        }
        catch (e)
        {
          console.log(e.message)
        }
    }


}
module.exports=ProcedureService