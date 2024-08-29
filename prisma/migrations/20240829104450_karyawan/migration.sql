-- CreateTable
CREATE TABLE `Karyawan` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `nama` VARCHAR(191) NOT NULL,
    `email` VARCHAR(191) NOT NULL,
    `posisi` VARCHAR(191) NOT NULL,
    `tanggalMasuk` DATETIME(3) NOT NULL,
    `gaji` DECIMAL(65, 30) NOT NULL DEFAULT 0.0,

    UNIQUE INDEX `Karyawan_email_key`(`email`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;
