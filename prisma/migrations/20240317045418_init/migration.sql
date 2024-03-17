/*
  Warnings:

  - You are about to drop the `Record` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "Record" DROP CONSTRAINT "Record_userId_fkey";

-- DropTable
DROP TABLE "Record";

-- CreateTable
CREATE TABLE "RecordLog" (
    "id" SERIAL NOT NULL,
    "userId" INTEGER NOT NULL,
    "action" TEXT NOT NULL,
    "module" TEXT NOT NULL,
    "message" TEXT NOT NULL,
    "detail" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "RecordLog_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "RecordLog" ADD CONSTRAINT "RecordLog_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
