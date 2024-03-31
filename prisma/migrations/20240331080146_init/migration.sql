/*
  Warnings:

  - You are about to drop the column `factoryId` on the `User` table. All the data in the column will be lost.

*/
-- DropForeignKey
ALTER TABLE "User" DROP CONSTRAINT "User_factoryId_fkey";

-- AlterTable
ALTER TABLE "User" DROP COLUMN "factoryId";

-- CreateTable
CREATE TABLE "_FactoryToRole" (
    "A" INTEGER NOT NULL,
    "B" INTEGER NOT NULL
);

-- CreateIndex
CREATE UNIQUE INDEX "_FactoryToRole_AB_unique" ON "_FactoryToRole"("A", "B");

-- CreateIndex
CREATE INDEX "_FactoryToRole_B_index" ON "_FactoryToRole"("B");

-- AddForeignKey
ALTER TABLE "Factory" ADD CONSTRAINT "Factory_createrId_fkey" FOREIGN KEY ("createrId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_FactoryToRole" ADD CONSTRAINT "_FactoryToRole_A_fkey" FOREIGN KEY ("A") REFERENCES "Factory"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_FactoryToRole" ADD CONSTRAINT "_FactoryToRole_B_fkey" FOREIGN KEY ("B") REFERENCES "Role"("id") ON DELETE CASCADE ON UPDATE CASCADE;
