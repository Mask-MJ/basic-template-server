/*
  Warnings:

  - You are about to drop the column `highValveNum` on the `Contract` table. All the data in the column will be lost.
  - You are about to drop the column `valveNum` on the `Contract` table. All the data in the column will be lost.
  - Added the required column `highValveCount` to the `Contract` table without a default value. This is not possible if the table is not empty.
  - Added the required column `valveCount` to the `Contract` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Contract" DROP COLUMN "highValveNum",
DROP COLUMN "valveNum",
ADD COLUMN     "highValveCount" INTEGER NOT NULL,
ADD COLUMN     "valveCount" INTEGER NOT NULL;
