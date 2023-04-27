/*
  Warnings:

  - You are about to alter the column `date_` on the `Comments` table. The data in that column could be lost. The data in that column will be cast from `Timestamp(0)` to `Timestamp`.
  - Changed the type of `date_` on the `Notification` table. No cast exists, the column would be dropped and recreated, which cannot be done if there is data, since the column is required.

*/
-- AlterTable
ALTER TABLE `Comments` MODIFY `date_` TIMESTAMP NOT NULL;

-- AlterTable
ALTER TABLE `Notification` DROP COLUMN `date_`,
    ADD COLUMN `date_` TIMESTAMP NOT NULL;
