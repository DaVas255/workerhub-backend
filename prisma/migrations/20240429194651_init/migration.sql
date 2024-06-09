/*
  Warnings:

  - The `status` column on the `Task` table would be dropped and recreated. This will lead to data loss if there is data in the column.
  - A unique constraint covering the columns `[cityId]` on the table `Task` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[specialtyId]` on the table `Task` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[cityId]` on the table `User` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `cityId` to the `Task` table without a default value. This is not possible if the table is not empty.
  - Added the required column `specialtyId` to the `Task` table without a default value. This is not possible if the table is not empty.
  - Added the required column `cityId` to the `User` table without a default value. This is not possible if the table is not empty.

*/
-- CreateEnum
CREATE TYPE "EnumTaskStatus" AS ENUM ('open', 'accepted', 'completed');

-- AlterTable
ALTER TABLE "Task" ADD COLUMN     "cityId" INTEGER NOT NULL,
ADD COLUMN     "specialtyId" INTEGER NOT NULL,
DROP COLUMN "status",
ADD COLUMN     "status" "EnumTaskStatus" NOT NULL DEFAULT 'open';

-- AlterTable
ALTER TABLE "User" ADD COLUMN     "cityId" INTEGER NOT NULL;

-- DropEnum
DROP TYPE "TaskStatus";

-- CreateTable
CREATE TABLE "Speciality" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,

    CONSTRAINT "Speciality_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "UserSpeciality" (
    "userId" INTEGER NOT NULL,
    "specialityId" INTEGER NOT NULL,

    CONSTRAINT "UserSpeciality_pkey" PRIMARY KEY ("userId","specialityId")
);

-- CreateTable
CREATE TABLE "City" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,

    CONSTRAINT "City_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Review" (
    "id" SERIAL NOT NULL,
    "Date" TIMESTAMP(3) NOT NULL,
    "text" TEXT NOT NULL,
    "rating" INTEGER NOT NULL,
    "userId" INTEGER NOT NULL,

    CONSTRAINT "Review_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Chat" (
    "id" SERIAL NOT NULL,
    "username" TEXT NOT NULL,
    "text" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "Chat_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Task_cityId_key" ON "Task"("cityId");

-- CreateIndex
CREATE UNIQUE INDEX "Task_specialtyId_key" ON "Task"("specialtyId");

-- CreateIndex
CREATE UNIQUE INDEX "User_cityId_key" ON "User"("cityId");

-- AddForeignKey
ALTER TABLE "Task" ADD CONSTRAINT "Task_cityId_fkey" FOREIGN KEY ("cityId") REFERENCES "City"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Task" ADD CONSTRAINT "Task_specialtyId_fkey" FOREIGN KEY ("specialtyId") REFERENCES "Speciality"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "User" ADD CONSTRAINT "User_cityId_fkey" FOREIGN KEY ("cityId") REFERENCES "City"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "UserSpeciality" ADD CONSTRAINT "UserSpeciality_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "UserSpeciality" ADD CONSTRAINT "UserSpeciality_specialityId_fkey" FOREIGN KEY ("specialityId") REFERENCES "Speciality"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Review" ADD CONSTRAINT "Review_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
