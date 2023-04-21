/*
  Warnings:

  - Changed the type of `date_` on the `Comments` table. No cast exists, the column would be dropped and recreated, which cannot be done if there is data, since the column is required.

*/
-- AlterTable
ALTER TABLE `Comments` DROP COLUMN `date_`,
    ADD COLUMN `date_` TIMESTAMP NOT NULL;
