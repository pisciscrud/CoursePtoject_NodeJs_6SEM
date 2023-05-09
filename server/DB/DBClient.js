const {PrismaClient,ScheduleScalarFieldEnum} = require("@prisma/client");

const DbClient = new PrismaClient();

module.exports = {DbClient,ScheduleScalarFieldEnum};