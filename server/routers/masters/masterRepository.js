const express = require('express');

const {DbClient} = require("../../Db/DbClient");

const createError = require("http-errors");

class MasterRepository {

    constructor() {
        this.prismaClient = DbClient;
    }


    async findAll() {
        try {

            const masters = await this.prismaClient.Master.findMany(
                {

                    include: {
                        Master_to_Procedure:
                            {
                                select : {Procedure_table: true}
                            }

                    },

                });

            return masters;
        } catch (e) {
            throw createError(500, "Db error:" + e.message);
        }


    }

async  avgRating(masterId) {
    const avgRating = await this.prismaClient.Comments.aggregate({
        where: {
            master_id: masterId,
        },

        _avg: {
            rating: true,
        },
    });
    return avgRating

}

    async findMaster(id) {
        try {
            const master = await this.prismaClient.Master.findUnique({
                where: {
                    id: id
                },
                include: {
                    Master_to_Procedure: true
                }
            })
            return master
        } catch (e) {
            throw createError(500, "Db error:" + e.message);
        }


    }

    async createMaster(name_master, surname_master, description,photo_master,Master_to_Procedure) {
        try {
            const arr =JSON.parse(Master_to_Procedure);

            const result = arr.map(obj => {
                const key = Object.keys(obj)[0].replace(/'/g, '').trim();
                const value = obj[key];
                return {[key]: value};
            });

            const master = await this.prismaClient.Master.create({
                data: {
                    name_master: name_master,
                    surname_master:surname_master,
                    description: description,
                    photo_master: photo_master,
                    Master_to_Procedure:
                        {
                            create:result
                        }
                }
            })
            return master;
        } catch (e) {
            throw createError(500, "Db error:" + e.message);
        }

    }


    async connectMasterToProcedure(master_id, procedure_id) {
        try {

            const existConnection = await this.prismaClient.Master_to_Procedure.findFirst({
                where: {
                    master_id,
                    procedure_id

                }
            })
            if (!existConnection) {

                const master = await this.prismaClient.Master_to_Procedure.create({
                    data: {

                        master_id,
                        procedure_id
                    }
                })
                return master;
            } else {
                throw createError(500, "Db error:This connection master to procedure already exist")
            }
        } catch (e) {
            throw createError(500, "Db error:" + e.message);
        }
    }

    async deleteMaster(id)
    {
        try
        {
            const master = await this.prismaClient.Master.delete({
                where: {
                    id
                }
            })
            return master;
        }
        catch (e)
        {
            throw createError(500, "Db error:" + e.message);
        }
    }

    async updateMaster(id,name_master,surname_master,description,img)
    {
        try
        {
            const master = await this.prismaClient.Master.update({
                where: {
                    id
                },
                data: {
                    name_master,
                    surname_master,
                    description,
                    img
                }
            })
            return master;
        }
        catch (e)
        {
            throw createError(500, "Db error:" + e.message);
        }
    }

    async deleteMasterToProcedure(master_id,procedure_id)
    {
        try
        {
            const master = await this.prismaClient.Master_to_Procedure.delete({
                where: {
                    master_id,
                    procedure_id
                }
            })
            return master;
        }
        catch (e)
        {
            throw createError(500, "Db error:" + e.message);
        }
    }

}

module.exports = MasterRepository;