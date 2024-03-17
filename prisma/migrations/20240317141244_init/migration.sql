/*
  Warnings:

  - Added the required column `account` to the `RecordLog` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "RecordLog" ADD COLUMN     "account" TEXT NOT NULL,
ALTER COLUMN "detail" DROP NOT NULL;
