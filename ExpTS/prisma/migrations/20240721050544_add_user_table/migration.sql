-- CreateTable
CREATE TABLE `usuarios` (
    `id` CHAR(40) NOT NULL,
    `name` VARCHAR(100) NOT NULL,
    `email` VARCHAR(100) NOT NULL,
    `password` CHAR(60) NOT NULL,
    `majorId` CHAR(40) NOT NULL,
    `created_at` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updated_at` DATETIME(3) NOT NULL,

    UNIQUE INDEX `usuarios_email_key`(`email`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `usuarios` ADD CONSTRAINT `usuarios_majorId_fkey` FOREIGN KEY (`majorId`) REFERENCES `majors`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;
