const express = require('express');

const {DbClient} = require("../../Db/DbClient");

const createError = require("http-errors");


class   CommentRepository {

    constructor() {
        this.prismaClient = DbClient;
    }

    async findAll() {
        try {

            const comments = await this.prismaClient.Comments.findMany(
                {

                  include :
                        {
                            Procedure_table:
                                {
                                    select :
                                        {
                                            name_procedure: true
                                        }
                                },
                            Master:{
                                select:
                                    {
                                        name_master:true,
                                        surname_master:true
                                    }
                            },
                            User_table:
                                {
                                    select :
                                        {
                                            full_name:true
                                        }
                                }
                        },
                    orderBy: [
                        {
                            date_: 'desc',
                        }]
                });

            return comments;
        } catch (e) {
            throw createError(500, "Db error:" + e.message);
        }

    }

    async createComment(date_, rating,  content, user_id, master_id, procedure_id)
    {
        try
        {

            console.log('AAAAA',rating);

            const comment = await this.prismaClient.Comments.create(
                {
                    data:
                        {
                            date_,
                            rating,
                            content,
                            user_id ,
                            master_id,
                            procedure_id
                        },
                    include :
                        {
                            Procedure_table:
                                {
                                    select :
                                        {
                                            name_procedure: true
                                        }
                                },
                            Master:{
                                select:
                                    {
                                        name_master:true,
                                        surname_master:true
                                    }
                            },
                            User_table:
                                {
                                    select :
                                        {
                                            full_name:true
                                        }
                                }
                        }

                }
            )
            return comment
        }
        catch (e) {
            throw createError(500, "Db error:" + e.message);
        }
    }
}
module.exports = CommentRepository;