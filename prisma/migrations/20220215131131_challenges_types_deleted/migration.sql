/*
  Warnings:

  - You are about to drop the column `challenge_type` on the `challenges` table. All the data in the column will be lost.
  - You are about to drop the `challenges_types` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "challenges" DROP CONSTRAINT "challenges_challenge_type_fkey";

-- AlterTable
ALTER TABLE "challenges" DROP COLUMN "challenge_type";

-- DropTable
DROP TABLE "challenges_types";
