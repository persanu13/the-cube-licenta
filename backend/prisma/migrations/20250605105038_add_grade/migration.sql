/*
  Warnings:

  - Added the required column `max_grade` to the `courses` table without a default value. This is not possible if the table is not empty.
  - Added the required column `min_grade` to the `courses` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "courses" ADD COLUMN     "max_grade" INTEGER NOT NULL,
ADD COLUMN     "min_grade" INTEGER NOT NULL;
