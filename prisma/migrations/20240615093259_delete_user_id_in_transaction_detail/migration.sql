/*
  Warnings:

  - You are about to drop the column `userUser_id` on the `transaction_detail` table. All the data in the column will be lost.

*/
-- DropForeignKey
ALTER TABLE "transaction_detail" DROP CONSTRAINT "transaction_detail_userUser_id_fkey";

-- AlterTable
ALTER TABLE "transaction_detail" DROP COLUMN "userUser_id";
