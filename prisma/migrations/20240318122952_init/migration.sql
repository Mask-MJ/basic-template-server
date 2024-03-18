-- DropForeignKey
ALTER TABLE "Dept" DROP CONSTRAINT "Dept_parentId_fkey";

-- AlterTable
ALTER TABLE "Dept" ALTER COLUMN "parentId" DROP NOT NULL;

-- AddForeignKey
ALTER TABLE "Dept" ADD CONSTRAINT "Dept_parentId_fkey" FOREIGN KEY ("parentId") REFERENCES "Dept"("id") ON DELETE SET NULL ON UPDATE CASCADE;
