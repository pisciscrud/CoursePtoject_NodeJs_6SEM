-- CreateTable
CREATE TABLE `Master` (
    `id` CHAR(36) NOT NULL DEFAULT (uuid()),
    `name_master` VARCHAR(20) NOT NULL,
    `surname_master` VARCHAR(20) NOT NULL,
    `description` TEXT NOT NULL,
    `photo_master` VARCHAR(100) NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Master_to_Procedure` (
    `id` CHAR(36) NOT NULL DEFAULT (uuid()),
    `master_id` CHAR(36) NOT NULL,
    `procedure_id` CHAR(36) NOT NULL,

    INDEX `fk_masterprocedure`(`procedure_id`),
    INDEX `fk_proceduremaster`(`master_id`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Pet` (
    `id` CHAR(36) NOT NULL DEFAULT (uuid()),
    `pet_type_id` INTEGER NOT NULL,
    `age` INTEGER NOT NULL,
    `id_owner` CHAR(36) NOT NULL,
    `nickname` VARCHAR(30) NOT NULL,

    INDEX `fk_pettype`(`pet_type_id`),
    INDEX `fk_petuser`(`id_owner`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Procedure_table` (
    `id` CHAR(36) NOT NULL DEFAULT (uuid()),
    `name_procedure` VARCHAR(20) NOT NULL,
    `Price` DECIMAL(13, 2) NOT NULL,
    `description` TEXT NOT NULL,
    `procedure_photo` VARCHAR(100) NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Procedure_to_pet` (
    `id` CHAR(36) NOT NULL DEFAULT (uuid()),
    `pet_id` INTEGER NOT NULL,
    `procedure_id` CHAR(36) NOT NULL,

    INDEX `fk_pettypeproc`(`pet_id`),
    INDEX `fk_procproc`(`procedure_id`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Role_table` (
    `id` INTEGER NOT NULL,
    `Role_name` VARCHAR(30) NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Schedule` (
    `id` CHAR(36) NOT NULL DEFAULT (uuid()),
    `pet_id` CHAR(36) NOT NULL,
    `master_id` CHAR(36) NOT NULL,
    `procedure_id` CHAR(36) NOT NULL,
    `owner_id` CHAR(36) NOT NULL,
    `date_` DATE NOT NULL,
    `status_id` INTEGER NOT NULL,

    INDEX `fk_petschedule`(`pet_id`),
    INDEX `fk_procedureschedule`(`procedure_id`),
    INDEX `fk_schedulemaster`(`master_id`),
    INDEX `fk_statusschedule`(`status_id`),
    INDEX `fk_userschedule`(`owner_id`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Status` (
    `id` INTEGER NOT NULL DEFAULT 4,
    `status_name` VARCHAR(20) NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `User_table` (
    `id` CHAR(36) NOT NULL DEFAULT (uuid()),
    `full_name` VARCHAR(30) NOT NULL,
    `email` VARCHAR(30) NOT NULL,
    `login` VARCHAR(64) NOT NULL,
    `password` VARCHAR(64) NOT NULL,
    `id_role` INTEGER NOT NULL DEFAULT 2,

    INDEX `fk_userrole`(`id_role`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `pettype` (
    `id` INTEGER NOT NULL,
    `pet_name` VARCHAR(20) NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `Master_to_Procedure` ADD CONSTRAINT `fk_masterprocedure` FOREIGN KEY (`procedure_id`) REFERENCES `Procedure_table`(`id`) ON DELETE CASCADE ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE `Master_to_Procedure` ADD CONSTRAINT `fk_proceduremaster` FOREIGN KEY (`master_id`) REFERENCES `Master`(`id`) ON DELETE CASCADE ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE `Pet` ADD CONSTRAINT `fk_pettype` FOREIGN KEY (`pet_type_id`) REFERENCES `pettype`(`id`) ON DELETE CASCADE ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE `Pet` ADD CONSTRAINT `fk_petuser` FOREIGN KEY (`id_owner`) REFERENCES `User_table`(`id`) ON DELETE CASCADE ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE `Procedure_to_pet` ADD CONSTRAINT `fk_pettypeproc` FOREIGN KEY (`pet_id`) REFERENCES `pettype`(`id`) ON DELETE CASCADE ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE `Procedure_to_pet` ADD CONSTRAINT `fk_procproc` FOREIGN KEY (`procedure_id`) REFERENCES `Procedure_table`(`id`) ON DELETE CASCADE ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE `Schedule` ADD CONSTRAINT `fk_petschedule` FOREIGN KEY (`pet_id`) REFERENCES `Pet`(`id`) ON DELETE CASCADE ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE `Schedule` ADD CONSTRAINT `fk_procedureschedule` FOREIGN KEY (`procedure_id`) REFERENCES `Procedure_table`(`id`) ON DELETE CASCADE ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE `Schedule` ADD CONSTRAINT `fk_schedulemaster` FOREIGN KEY (`master_id`) REFERENCES `Master`(`id`) ON DELETE CASCADE ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE `Schedule` ADD CONSTRAINT `fk_statusschedule` FOREIGN KEY (`status_id`) REFERENCES `Status`(`id`) ON DELETE CASCADE ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE `Schedule` ADD CONSTRAINT `fk_userschedule` FOREIGN KEY (`owner_id`) REFERENCES `User_table`(`id`) ON DELETE CASCADE ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE `User_table` ADD CONSTRAINT `fk_userrole` FOREIGN KEY (`id_role`) REFERENCES `Role_table`(`id`) ON DELETE CASCADE ON UPDATE NO ACTION;
