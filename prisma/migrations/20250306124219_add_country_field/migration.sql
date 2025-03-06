/*
  Warnings:

  - You are about to drop the column `category` on the `Interest` table. All the data in the column will be lost.
  - You are about to drop the column `password` on the `User` table. All the data in the column will be lost.
  - The primary key for the `_InterestToUser` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - A unique constraint covering the columns `[A,B]` on the table `_InterestToUser` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `hashedPassword` to the `User` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Interest" DROP COLUMN "category";

-- AlterTable
ALTER TABLE "User" DROP COLUMN "password",
ADD COLUMN     "city" TEXT,
ADD COLUMN     "country" TEXT,
ADD COLUMN     "hashedPassword" TEXT NOT NULL,
ALTER COLUMN "userType" SET DEFAULT 'GUEST';

-- AlterTable
ALTER TABLE "_InterestToUser" DROP CONSTRAINT "_InterestToUser_AB_pkey";

-- CreateIndex
CREATE UNIQUE INDEX "_InterestToUser_AB_unique" ON "_InterestToUser"("A", "B");
