-- AlterTable
ALTER TABLE "users" ADD COLUMN     "user_status_id" INTEGER;

-- CreateTable
CREATE TABLE "user_status" (
    "user_status_id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "user_status_pkey" PRIMARY KEY ("user_status_id")
);

-- AddForeignKey
ALTER TABLE "users" ADD CONSTRAINT "users_user_status_id_fkey" FOREIGN KEY ("user_status_id") REFERENCES "user_status"("user_status_id") ON DELETE SET NULL ON UPDATE CASCADE;
