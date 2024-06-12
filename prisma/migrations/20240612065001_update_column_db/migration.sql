/*
  Warnings:

  - You are about to drop the column `userUser_id` on the `transaction_detail` table. All the data in the column will be lost.
  - Added the required column `date` to the `transaction_detail` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "transaction_detail" DROP CONSTRAINT "transaction_detail_userUser_id_fkey";

-- AlterTable
ALTER TABLE "transaction_detail" DROP COLUMN "userUser_id",
ADD COLUMN     "date" TIMESTAMP(3) NOT NULL,
ADD COLUMN     "user_id" TEXT;

-- AddForeignKey
ALTER TABLE "transaction_detail" ADD CONSTRAINT "transaction_detail_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "users"("user_id") ON DELETE SET NULL ON UPDATE CASCADE;
