/*
  Warnings:

  - Added the required column `challenges_type` to the `challenges` table without a default value. This is not possible if the table is not empty.

*/
-- CreateEnum
CREATE TYPE "Challenges_Type" AS ENUM ('drive_forward', 'hold_back');

-- AlterTable
ALTER TABLE "challenges" ADD COLUMN     "challenges_type" "Challenges_Type" NOT NULL;
