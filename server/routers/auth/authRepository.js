const express = require('express');

const {DbClient} = require("../../Db/DbClient");

const createError = require("http-errors");

class AuthRepository {

    constructor() {
        this.prismaClient = DbClient;
    }

    async findUserByLogin(login) {

        try {

           const user = await this.prismaClient.User_table.findFirst({
                where: {
                    login: login
                },
            });

           return user;
        } catch (e) {
            throw createError(500, "Db error:" + e.message);
        }
    }

    async findUserById(id)
    {
        try
        {
            const user = await this.prismaClient.User_table.findUnique(
                {
                    where:
                        {
                            id:id
                        }
                        ,
                    include :
                        {
                            Role_table:true
                        }
                }
            )
            return user;
        }
        catch (e) {
            throw createError(500, "Db error:" + e.message);
        }
    }

    async createUser(FullName,hashedPassword,login,email)
    {
        try
        {
            const user = await this.prismaClient.User_table.create(
                {

                    data: {
                        login: login,
                        email:email,
                        full_name:FullName,
                        password: hashedPassword,
                        id_role : 1
                    }
                })
        }


        catch (err)
        {
            throw createError(500, "Db error:" + err.message);
        }

    }
    async findRoleById(id)
    {
        try
        {
            return await this.prismaClient.Role_table.findUnique({
                where: {
                    id: id
                }
            })
        }
        catch (err)
        {
            throw createError(500, "Db error:" + err.message);
        }

    }


}

module.exports = AuthRepository;