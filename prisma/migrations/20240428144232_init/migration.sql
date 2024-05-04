-- CreateTable
CREATE TABLE "Project" (
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

    CONSTRAINT "Project_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "Project" ADD CONSTRAINT "Project_factoryId_fkey" FOREIGN KEY ("factoryId") REFERENCES "Factory"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
