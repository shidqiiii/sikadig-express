/*
  Warnings:

  - You are about to drop the column `date` on the `transaction_detail` table. All the data in the column will be lost.
  - You are about to drop the column `user_id` on the `transaction_detail` table. All the data in the column will be lost.
  - You are about to drop the column `status` on the `transactions` table. All the data in the column will be lost.
  - Added the required column `date` to the `transactions` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "transaction_detail" DROP CONSTRAINT "transaction_detail_user_id_fkey";

-- AlterTable
ALTER TABLE "transaction_detail" DROP COLUMN "date",
DROP COLUMN "user_id",
ADD COLUMN     "userUser_id" TEXT;

-- AlterTable
ALTER TABLE "transactions" DROP COLUMN "status",
ADD COLUMN     "date" TIMESTAMP(3) NOT NULL,
ADD COLUMN     "transaction_status_id" INTEGER;

-- CreateTable
CREATE TABLE "transaction_status" (
    "transaction_status_id" INTEGER NOT NULL,
    "name" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "transaction_status_pkey" PRIMARY KEY ("transaction_status_id")
);

-- AddForeignKey
ALTER TABLE "transactions" ADD CONSTRAINT "transactions_transaction_status_id_fkey" FOREIGN KEY ("transaction_status_id") REFERENCES "transaction_status"("transaction_status_id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "transaction_detail" ADD CONSTRAINT "transaction_detail_userUser_id_fkey" FOREIGN KEY ("userUser_id") REFERENCES "users"("user_id") ON DELETE SET NULL ON UPDATE CASCADE;
