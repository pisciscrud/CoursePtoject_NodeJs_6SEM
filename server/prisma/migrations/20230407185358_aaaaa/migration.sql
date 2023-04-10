/*
  Warnings:

  - Made the column `time` on table `Schedule` required. This step will fail if there are existing NULL values in that column.

*/
-- AlterTable
ALTER TABLE `Schedule` MODIFY `time` TIME NOT NULL;
