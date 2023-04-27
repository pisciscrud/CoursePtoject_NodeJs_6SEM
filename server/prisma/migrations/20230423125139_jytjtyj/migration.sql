/*
  Warnings:

  - You are about to alter the column `date_` on the `Comments` table. The data in that column could be lost. The data in that column will be cast from `Timestamp(0)` to `Timestamp`.
  - Added the required column `record_id` to the `Comments` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `Comments` ADD COLUMN `record_id` CHAR(36) NOT NULL,
    MODIFY `date_` TIMESTAMP NOT NULL;

-- CreateIndex
CREATE INDEX `fk_commentsofrecord` ON `Comments`(`record_id`);

-- AddForeignKey
ALTER TABLE `Comments` ADD CONSTRAINT `fk_commentsofrecord` FOREIGN KEY (`record_id`) REFERENCES `Schedule`(`id`) ON DELETE CASCADE ON UPDATE NO ACTION;
