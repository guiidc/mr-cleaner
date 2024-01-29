/*
  Warnings:

  - You are about to drop the column `coordenate_x` on the `companies` table. All the data in the column will be lost.
  - You are about to drop the column `coordenate_y` on the `companies` table. All the data in the column will be lost.
  - Added the required column `coordinate_x` to the `companies` table without a default value. This is not possible if the table is not empty.
  - Added the required column `coordinate_y` to the `companies` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "companies" DROP COLUMN "coordenate_x",
DROP COLUMN "coordenate_y",
ADD COLUMN     "coordinate_x" DOUBLE PRECISION NOT NULL,
ADD COLUMN     "coordinate_y" DOUBLE PRECISION NOT NULL;
