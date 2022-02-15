/*
  Warnings:

  - You are about to drop the column `challenges_type` on the `challenges` table. All the data in the column will be lost.
  - Added the required column `challenge_type` to the `challenges` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "challenges" DROP COLUMN "challenges_type",
ADD COLUMN     "challenge_type" "Challenges_Type" NOT NULL;
