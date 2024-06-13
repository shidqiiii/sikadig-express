import { prismaClient } from "../../src/utils/prisma.js";
import bcrypt from "bcrypt";

const main = async () => {
    try {
        await prismaClient.role.createMany({
            data: [{ name: "Super Admin" }, { name: "Cashier" }],
        });

        await prismaClient.userStatus.createMany({
            data: [{ name: "Active" }, { name: "Inactive" }],
        });

        await prismaClient.menuType.createMany({
            data: [{ name: "Food" }, { name: "Drink" }],
        });

        await prismaClient.menuStatus.createMany({
            data: [{ name: "Ready" }, { name: "Empty" }],
        });

        const role = await prismaClient.role.findMany({
            select: {
                role_id: true,
            },
        });

        const users = ["Albert Singgih", "Doni Maulana"];
        const emailformat = (name) => {
            const split = name.split(" ").map((item) => item.toLowerCase());
            return split.join("_");
        };
        await prismaClient.user.createMany({
            data: users.map((item, index) => {
                return {
                    name: item,
                    email: emailformat(item) + "@gmail.com",
                    password: bcrypt.hashSync("test1234", 10),
                    role_id: role[index].role_id,
                    user_status_id: 1,
                };
            }),
        });

        const menutype = await prismaClient.menuType.findFirst({
            where: { name: "Food" },
            select: { menu_type_id: true },
        });

        const menus = ["Nasi goreng", "Mie goreng", "Mie rebus", "Capcay goreng", "Capcay rebus"];
        await prismaClient.menu.createMany({
            data: menus.map((item) => {
                return {
                    name: item,
                    description: item + " lezat yang dibuat sepenuh hati",
                    price: 10000,
                    menu_type_id: menutype.menu_type_id,
                    menu_status_id: 1,
                };
            }),
        });
    } catch (e) {
        console.error(e);
        process.exit(1);
    } finally {
        await prismaClient.$disconnect();
    }
};

main();
