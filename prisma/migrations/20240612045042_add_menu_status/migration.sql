-- AlterTable
ALTER TABLE "menus" ADD COLUMN     "menuStatusMenu_status_id" INTEGER;

-- CreateTable
CREATE TABLE "menu_status" (
    "menu_status_id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "menu_status_pkey" PRIMARY KEY ("menu_status_id")
);

-- AddForeignKey
ALTER TABLE "menus" ADD CONSTRAINT "menus_menuStatusMenu_status_id_fkey" FOREIGN KEY ("menuStatusMenu_status_id") REFERENCES "menu_status"("menu_status_id") ON DELETE SET NULL ON UPDATE CASCADE;
