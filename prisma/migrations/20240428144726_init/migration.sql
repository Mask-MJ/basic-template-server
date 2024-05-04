/*
  Warnings:

  - You are about to drop the `Project` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "Project" DROP CONSTRAINT "Project_factoryId_fkey";

-- DropTable
DROP TABLE "Project";

-- CreateTable
CREATE TABLE "Contract" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "contractTime" TIMESTAMP(3) NOT NULL,
    "valveNum" INTEGER NOT NULL,
    "highValveNum" INTEGER NOT NULL,
    "customer" TEXT NOT NULL,
    "customerPhone" TEXT NOT NULL,
    "saler" TEXT NOT NULL,
    "remark" TEXT,
    "factoryId" INTEGER NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Contract_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "Contract" ADD CONSTRAINT "Contract_factoryId_fkey" FOREIGN KEY ("factoryId") REFERENCES "Factory"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
