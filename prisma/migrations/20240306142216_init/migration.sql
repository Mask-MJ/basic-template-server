/*
  Warnings:

  - You are about to drop the column `sort` on the `Permission` table. All the data in the column will be lost.
  - You are about to drop the column `status` on the `Permission` table. All the data in the column will be lost.
  - You are about to drop the column `sort` on the `Role` table. All the data in the column will be lost.
  - You are about to drop the column `status` on the `Role` table. All the data in the column will be lost.

*/
-- DropIndex
DROP INDEX "Permission_name_key";

-- AlterTable
ALTER TABLE "Permission" DROP COLUMN "sort",
DROP COLUMN "status";

-- AlterTable
ALTER TABLE "Role" DROP COLUMN "sort",
DROP COLUMN "status";
