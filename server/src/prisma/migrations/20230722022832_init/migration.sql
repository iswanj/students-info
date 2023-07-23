/*
  Warnings:

  - You are about to drop the column `studentId` on the `Exam` table. All the data in the column will be lost.

*/
-- DropForeignKey
ALTER TABLE "Exam" DROP CONSTRAINT "Exam_studentId_fkey";

-- AlterTable
ALTER TABLE "Exam" DROP COLUMN "studentId";
