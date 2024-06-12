import { prismaClient } from "../../src/utils/prisma.js";

const main = async () => {
    try {
        await prismaClient.role.createMany({
            data: [{ name: "Super Admin" }, { name: "Admin" }],
        });

        await prismaClient.menuType.createMany({
            data: [{ name: "Food" }, { name: "Drink" }],
        });
        await prismaClient.menuStatus.createMany({
            data: [{ name: "Ready" }, { name: "Empty" }],
        });
    } catch (e) {
        console.error(e);
        process.exit(1);
    } finally {
        await prismaClient.$disconnect();
    }
};

main();
