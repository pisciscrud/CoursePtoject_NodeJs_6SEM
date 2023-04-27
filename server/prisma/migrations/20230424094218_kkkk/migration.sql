/*
  Warnings:

  - You are about to alter the column `date_` on the `Comments` table. The data in that column could be lost. The data in that column will be cast from `Timestamp(0)` to `Timestamp`.

*/
-- AlterTable
ALTER TABLE `Comments` MODIFY `date_` TIMESTAMP NOT NULL;
