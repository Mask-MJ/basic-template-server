-- CreateTable
CREATE TABLE "DictData" (
    "id" SERIAL NOT NULL,
    "dictId" INTEGER NOT NULL,
    "name" TEXT NOT NULL,
    "value" TEXT NOT NULL,
    "sort" INTEGER NOT NULL DEFAULT 1,
    "remark" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "DictData_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "DictData" ADD CONSTRAINT "DictData_dictId_fkey" FOREIGN KEY ("dictId") REFERENCES "Dict"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
