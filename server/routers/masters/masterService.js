
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const createError = require("http-errors");
const MasterRepository = require("../masters/masterRepository");

class MasterService {

    constructor() {

        this.masterRepository = new MasterRepository();
    }

    async getAllMasters() {
        try {
            return this.masterRepository.findAll();
        }
        catch(e)
        {

        }

    }

    async getInfoAboutMaster(id)
    {
        try
        {
            const master = this.masterRepository.findMaster(id);
          return master;
        }
        catch (e)
        {

        }
    }

    async addMaster(name_master,surname_master,description,photo_master)
    {
        try
        {

            const master = this.masterRepository.createMaster(name_master,surname_master,description,photo_master);
            return master;
        }
        catch (e)
        {

        }
    }

    async connectMasterToProcedure(master_id, procedure_id)
    {
        try
        {
            const master = this.masterRepository.connectMasterToProcedure(master_id, procedure_id);
            return master;
        }
        catch (e)
        {

        }

    }
    async deleteMasterById(id)
    {
        try
        {
            const master = this.masterRepository.deleteMaster(id)
            return master;
        }
        catch(e)
        {

        }
    }


    async updateMasterById(id,name_master,surname_master,description,img)
    {
        try
        {
            const master = this.masterRepository.updateMaster(id,name_master,surname_master,description,img)
            return master;
        }
        catch(e)
        {

        }
    }
}

module.exports = MasterService;