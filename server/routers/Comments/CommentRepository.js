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

    async createComment(date_, content, user_id, master_id, procedure_id)
    {
        try
        {
            const comment = await this.prismaClient.Comments.create(
                {
                    data:
                        {
                            date_,
                            content,
                            user_id ,
                            master_id,
                            procedure_id
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