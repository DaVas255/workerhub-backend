/*
  Warnings:

  - You are about to drop the column `cityId` on the `Task` table. All the data in the column will be lost.
  - You are about to drop the `Chat` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `Review` table. If the table is not empty, all the data it contains will be lost.
  - Added the required column `city_id` to the `Task` table without a default value. This is not possible if the table is not empty.

*/
-- CreateEnum
CREATE TYPE "Role" AS ENUM ('USER', 'ADMIN');

-- DropForeignKey
ALTER TABLE "Review" DROP CONSTRAINT "Review_userId_fkey";

-- DropForeignKey
ALTER TABLE "Task" DROP CONSTRAINT "Task_cityId_fkey";

-- DropIndex
DROP INDEX "Task_cityId_key";

-- DropIndex
DROP INDEX "Task_specialtyId_key";

-- DropIndex
DROP INDEX "User_cityId_key";

-- AlterTable
ALTER TABLE "Task" DROP COLUMN "cityId",
ADD COLUMN     "city_id" INTEGER NOT NULL,
ADD COLUMN     "customerId" INTEGER,
ADD COLUMN     "executorId" INTEGER;

-- AlterTable
ALTER TABLE "User" ADD COLUMN     "role" "Role" NOT NULL DEFAULT 'USER';

-- DropTable
DROP TABLE "Chat";

-- DropTable
DROP TABLE "Review";

-- AddForeignKey
ALTER TABLE "Task" ADD CONSTRAINT "Task_city_id_fkey" FOREIGN KEY ("city_id") REFERENCES "City"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Task" ADD CONSTRAINT "Task_customerId_fkey" FOREIGN KEY ("customerId") REFERENCES "User"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Task" ADD CONSTRAINT "Task_executorId_fkey" FOREIGN KEY ("executorId") REFERENCES "User"("id") ON DELETE SET NULL ON UPDATE CASCADE;
