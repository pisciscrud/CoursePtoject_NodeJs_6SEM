/*
  Warnings:

  - You are about to alter the column `date_` on the `Comments` table. The data in that column could be lost. The data in that column will be cast from `Timestamp(0)` to `Timestamp`.
  - You are about to alter the column `date_` on the `Notification` table. The data in that column could be lost. The data in that column will be cast from `Timestamp(0)` to `Timestamp`.

*/
-- AlterTable
ALTER TABLE `Comments` MODIFY `date_` TIMESTAMP NOT NULL;

-- AlterTable
ALTER TABLE `Notification` MODIFY `date_` TIMESTAMP NOT NULL;
