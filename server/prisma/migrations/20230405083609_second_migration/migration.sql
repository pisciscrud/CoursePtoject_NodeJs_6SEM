-- AlterTable
ALTER TABLE `Schedule` ADD COLUMN `time` TIME NULL;

-- CreateTable
CREATE TABLE `Notification` (
    `id` CHAR(36) NOT NULL DEFAULT (uuid()),
    `date_` DATE NOT NULL,
    `accepted` BOOLEAN NOT NULL DEFAULT false,
    `user_id` CHAR(36) NOT NULL,

    INDEX `fk_notificationuser`(`user_id`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `Notification` ADD CONSTRAINT `fk_notificationuser` FOREIGN KEY (`user_id`) REFERENCES `User_table`(`id`) ON DELETE CASCADE ON UPDATE NO ACTION;
