/*
  Warnings:

  - Changed the type of `user_id` on the `books` table. No cast exists, the column would be dropped and recreated, which cannot be done if there is data, since the column is required.

*/
-- AlterTable
ALTER TABLE "books" ALTER COLUMN "id" SET DEFAULT uuid_generate_v4(),
DROP COLUMN "user_id",
ADD COLUMN     "user_id" UUID NOT NULL;

-- AddForeignKey
ALTER TABLE "books" ADD CONSTRAINT "books_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "profile"("id") ON DELETE NO ACTION ON UPDATE NO ACTION;
