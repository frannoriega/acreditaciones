/*
  Warnings:

  - The `menu_items` column on the `foodtrucks` table would be dropped and recreated. This will lead to data loss if there is data in the column.

*/
-- AlterTable
ALTER TABLE "foodtrucks" DROP COLUMN "menu_items",
ADD COLUMN     "menu_items" TEXT[];
