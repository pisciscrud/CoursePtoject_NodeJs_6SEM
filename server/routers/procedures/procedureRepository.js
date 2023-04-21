const express = require('express');

const {DbClient} = require("../../Db/DbClient");

const createError = require("http-errors");
class ProcedureRepository {
    constructor() {
        this.prismaClient = DbClient;
    }

    async findAll() {
        try {
            const procedures = await this.prismaClient.Procedure_table.findMany({
                    include:
                        {
                            Procedure_to_pet:true,
                        }
                }
            )
            return procedures;
        } catch (e) {
            throw createError(500, "Db error:" + e.message);
        }
    }


    async createProcedure(name_procedure, Price, description, procedure_photo,Procedure_to_pet) {
        try {

            const arr = JSON.parse(Procedure_to_pet);
            const result = arr.map(pet => {
                return { pet_id: Number(pet.pet_id) };
            });

            console.log(result);

            const procedureWithSameName = await this.prismaClient.Procedure_table.findFirst(
                {where: {name_procedure: name_procedure}}
            )
            if (!procedureWithSameName) {
                let price = parseFloat(Price)
                const procedure = await this.prismaClient.Procedure_table.create(
                    {
                        data: {
                            name_procedure,
                            Price: price,
                            description, procedure_photo,
                            Procedure_to_pet:
                                {
                                    create: result
                                }
                        }
                    }
                )
                return procedure;
            } else {
                throw createError(500, 'Db error: such procedure in database')
            }
        } catch (e) {
            throw createError(500, "Db error:" + e.message);
        }
    }


    async updateProcedure(id, name_procedure, Price, description, procedure_photo) {
        try {
            const procedure = await this.prismaClient.Procedure_table.update(
                {
                    where: {
                        id
                    },
                    data:
                    name_procedure,
                    Price,
                    description,
                    procedure_photo
                }
            )

            return procedure;
        } catch (e) {
            throw createError(500, "Db error:" + e.message);
        }
    }

    async deleteProcedure(id) {
        try {
            const procedure = await this.prismaClient.Procedure_table.delete(
                {
                    where:
                        {
                            id
                        }
                }
            )
            return procedure;

        } catch (e) {
            throw createError(500, "Db error:" + e.message);
        }
    }

    async connectionMastersAndProcedures()
    {
        try {
            const proceduresWithMasters=await this.prismaClient.Master_to_Procedure.findMany({
                select : {
                    id: false,
                    master_id: false,
                    procedure_id: false,

                        Procedure_table: {
                            select: {
                                name_procedure: true
                            }
                        },
                        Master: {
                            select: {
                                name_master: true,
                                surname_master: true
                            }
                        }
                    }

            })
            return proceduresWithMasters;
        }
        catch (e) {
            throw createError(500, "Db error:" + e.message);
        }
    }

    async findMastersByIdProcedure(id)
    {
        try
        {

            const mastersOfProcedure=await this.prismaClient.Master_to_Procedure.findMany({
                where:{
                    procedure_id : id
                },
                select : {
                    id: false,
                    master_id: false,
                    procedure_id: false,

                    Procedure_table: {
                        select: {
                            name_procedure: true,
                            Price:true
                        }
                    },
                    Master: {
                        select: {
                            id:true,
                            name_master: true,
                            surname_master: true
                        }
                    }
                }

            })
            return mastersOfProcedure;

        }
        catch (e)
        {
            throw createError(500, "Db error:" + e.message);
        }

    }

    async findProceduresByType(id)
    {
        try
        {

            const mastersOfProcedure = await this.prismaClient.Procedure_to_pet.findMany({
                where:{
                    pet_id:id
                },
                select :
                    {
                        Procedure_table:true
                    }
            })
            return mastersOfProcedure;

        }
        catch (e)
        {
            throw createError(500, "Db error:" + e.message);
        }
    }

    async findTypesByProcedure(id_procedure)
    {
        try
        {
            const typesForProcedure = await this.prismaClient.Procedure_to_pet.findMany({
                where:{
                    procedure_id:id_procedure
                },
                select :
                    {
                        pettype:true
                    }
            })
            return typesForProcedure;



        }
        catch (e)
        {
            throw createError(500, "Db error:" + e.message);
        }
    }

 async findPetsOfUserByProcedure(id_user,id_procedure) {
     try {
         const petsOfUser = await this.prismaClient.Pet.findMany({
             where: {
                 id_owner: id_user,
                 pettype: {
                     Procedure_to_pet: {
                         some: {
                             procedure_id: id_procedure
                         }
                     }
                 }
             },
             select:
                 {
                     id: true,
                     nickname: true,
                    pettype: true
                 }
         })

         return petsOfUser;
     } catch (e) {
         throw createError(500, "Db error:" + e.message);
     }
 }






}

module.exports = ProcedureRepository;