/*
  Warnings:

  - You are about to drop the `usuarios` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE `usuarios` DROP FOREIGN KEY `usuarios_majorId_fkey`;

-- DropTable
DROP TABLE `usuarios`;

-- CreateTable
CREATE TABLE `users` (
    `id` CHAR(40) NOT NULL,
    `name` VARCHAR(100) NOT NULL,
    `email` VARCHAR(100) NOT NULL,
    `password` CHAR(60) NOT NULL,
    `majorId` CHAR(40) NOT NULL,
    `created_at` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updated_at` DATETIME(3) NOT NULL,

    UNIQUE INDEX `users_email_key`(`email`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `users` ADD CONSTRAINT `users_majorId_fkey` FOREIGN KEY (`majorId`) REFERENCES `majors`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;
