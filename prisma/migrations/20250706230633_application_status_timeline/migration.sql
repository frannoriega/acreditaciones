/*
  Warnings:

  - You are about to drop the column `status` on the `artisans` table. All the data in the column will be lost.
  - You are about to drop the column `status` on the `bands` table. All the data in the column will be lost.
  - You are about to drop the column `status` on the `foodtrucks` table. All the data in the column will be lost.
  - You are about to drop the column `status` on the `press` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "artisans" DROP COLUMN "status";

-- AlterTable
ALTER TABLE "bands" DROP COLUMN "status";

-- AlterTable
ALTER TABLE "foodtrucks" DROP COLUMN "status";

-- AlterTable
ALTER TABLE "press" DROP COLUMN "status";

-- DropEnum
DROP TYPE "ApplicationStatus";

-- CreateTable
CREATE TABLE "application_statuses" (
    "id" TEXT NOT NULL,
    "status" TEXT NOT NULL,
    "message" TEXT,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "foodtruckId" TEXT,
    "artisanId" TEXT,
    "bandId" TEXT,
    "pressId" TEXT,

    CONSTRAINT "application_statuses_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "application_statuses" ADD CONSTRAINT "application_statuses_foodtruckId_fkey" FOREIGN KEY ("foodtruckId") REFERENCES "foodtrucks"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "application_statuses" ADD CONSTRAINT "application_statuses_artisanId_fkey" FOREIGN KEY ("artisanId") REFERENCES "artisans"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "application_statuses" ADD CONSTRAINT "application_statuses_bandId_fkey" FOREIGN KEY ("bandId") REFERENCES "bands"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "application_statuses" ADD CONSTRAINT "application_statuses_pressId_fkey" FOREIGN KEY ("pressId") REFERENCES "press"("id") ON DELETE CASCADE ON UPDATE CASCADE;
