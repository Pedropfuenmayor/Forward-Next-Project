-- AlterTable
ALTER TABLE "actions" ADD COLUMN     "user_id" SERIAL NOT NULL;

-- AddForeignKey
ALTER TABLE "actions" ADD CONSTRAINT "actions_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "users"("id") ON DELETE CASCADE ON UPDATE NO ACTION;
