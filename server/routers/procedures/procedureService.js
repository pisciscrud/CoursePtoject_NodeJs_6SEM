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


    async createProcedure(name_procedure,Price,description,procedure_photo)
    {
        try {

            return this.procedureRepository.createProcedure(name_procedure,Price,description,procedure_photo)

        }
        catch(e)
        {

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


}
module.exports=ProcedureService