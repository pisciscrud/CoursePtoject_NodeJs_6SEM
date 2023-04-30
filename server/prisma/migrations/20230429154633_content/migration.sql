/*
  Warnings:

  - You are about to alter the column `date_` on the `Comments` table. The data in that column could be lost. The data in that column will be cast from `Timestamp(0)` to `Timestamp`.
  - You are about to alter the column `date_` on the `Notification` table. The data in that column could be lost. The data in that column will be cast from `Timestamp(0)` to `Timestamp`.
  - Added the required column `content` to the `Notification` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `Comments` MODIFY `date_` TIMESTAMP NOT NULL;

-- AlterTable
ALTER TABLE `Notification` ADD COLUMN `content` TEXT NOT NULL,
    MODIFY `date_` TIMESTAMP NOT NULL;
