-- AlterTable
ALTER TABLE "menu_status" ALTER COLUMN "menu_status_id" DROP DEFAULT;
DROP SEQUENCE "menu_status_menu_status_id_seq";

-- AlterTable
ALTER TABLE "user_status" ALTER COLUMN "user_status_id" DROP DEFAULT;
DROP SEQUENCE "user_status_user_status_id_seq";
