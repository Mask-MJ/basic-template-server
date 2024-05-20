-- CreateTable
CREATE TABLE "AnalysisTask" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "status" INTEGER NOT NULL DEFAULT 0,
    "pdfPath" TEXT[],
    "remark" TEXT NOT NULL DEFAULT '',
    "dictId" INTEGER NOT NULL,
    "factoryId" INTEGER NOT NULL,
    "createBy" TEXT NOT NULL,
    "updateBy" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "AnalysisTask_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "AnalysisTask" ADD CONSTRAINT "AnalysisTask_dictId_fkey" FOREIGN KEY ("dictId") REFERENCES "DictData"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "AnalysisTask" ADD CONSTRAINT "AnalysisTask_factoryId_fkey" FOREIGN KEY ("factoryId") REFERENCES "Factory"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
