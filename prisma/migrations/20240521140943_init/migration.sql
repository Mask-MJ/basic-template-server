-- DropForeignKey
ALTER TABLE "AnalysisTask" DROP CONSTRAINT "AnalysisTask_dictId_fkey";

-- AddForeignKey
ALTER TABLE "AnalysisTask" ADD CONSTRAINT "AnalysisTask_dictId_fkey" FOREIGN KEY ("dictId") REFERENCES "Dict"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
