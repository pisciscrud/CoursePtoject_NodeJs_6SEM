-- CreateTable
CREATE TABLE `Comments` (
    `id` CHAR(36) NOT NULL DEFAULT (uuid()),
    `date_` DATE NOT NULL,
    `content` TEXT NOT NULL,
    `user_id` CHAR(36) NOT NULL,
    `master_id` CHAR(36) NOT NULL,
    `procedure_id` CHAR(36) NOT NULL,

    INDEX `fk_notificationuser`(`user_id`),
    INDEX `fk_commentsofmaster`(`master_id`),
    INDEX `fk_commentsofschedule`(`procedure_id`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `Comments` ADD CONSTRAINT `fk_commentsofuser` FOREIGN KEY (`user_id`) REFERENCES `User_table`(`id`) ON DELETE CASCADE ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE `Comments` ADD CONSTRAINT `fk_commentsofmaster` FOREIGN KEY (`master_id`) REFERENCES `Master`(`id`) ON DELETE CASCADE ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE `Comments` ADD CONSTRAINT `fk_commentsofschedule` FOREIGN KEY (`procedure_id`) REFERENCES `Procedure_table`(`id`) ON DELETE CASCADE ON UPDATE NO ACTION;
