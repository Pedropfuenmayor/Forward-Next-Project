/*
  Warnings:

  - The `challenge_type` column on the `challenges` table would be dropped and recreated. This will lead to data loss if there is data in the column.

*/
-- AlterTable
ALTER TABLE "challenges" DROP COLUMN "challenge_type",
ADD COLUMN     "challenge_type" VARCHAR(300);

-- DropEnum
DROP TYPE "Challenges_Type";
