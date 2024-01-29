/*
  Warnings:

  - The primary key for the `logs_access` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - The `id` column on the `logs_access` table would be dropped and recreated. This will lead to data loss if there is data in the column.

*/
-- AlterTable
ALTER TABLE "logs_access" DROP CONSTRAINT "logs_access_pkey",
DROP COLUMN "id",
ADD COLUMN     "id" SERIAL NOT NULL,
ADD CONSTRAINT "logs_access_pkey" PRIMARY KEY ("id");
