import createError from "http-errors";
import { prismaClient } from "../utils/prisma.js";
import { upsertMenuSchema } from "../validations/menu.validation.js";
import { validate } from "../validations/validate.js";

const list = async (query) => {
    const { limit = 10, offset = 0 } = query;
    const count = await prismaClient.menu.count();

    const menu = await prismaClient.menu.findMany({
        skip: parseInt(offset),
        take: parseInt(limit),
        select: {
            menu_id: true,
            name: true,
            price: true,
            menu_type: {
                select: {
                    name: true,
                },
            },
            menu_status: {
                select: {
                    name: true,
                },
            },
        },
    });

    return { total_data: count, menu };
};

const read = async (params) => {
    const menu = await prismaClient.menu.findUnique({
        where: {
            menu_id: params.menu_id,
        },
        select: {
            menu_id: true,
            name: true,
            description: true,
            price: true,
            menu_type: {
                select: {
                    menu_type_id: true,
                    name: true,
                },
            },
            menu_status: {
                select: {
                    menu_status_id: true,
                    name: true,
                },
            },
        },
    });

    if (!menu) {
        throw new Error(createError(404, "Menu not found"));
    }

    return menu;
};

const create = async (payload) => {
    const menu = await validate(upsertMenuSchema, payload);

    const menutype = await prismaClient.menuType.findUnique({
        where: {
            menu_type_id: menu.menu_type_id,
        },
    });

    if (!menutype) {
        throw new Error(createError(404, "Menu type found"));
    }

    const menustatus = await prismaClient.menuStatus.findUnique({
        where: {
            menu_status_id: menu.menu_status_id,
        },
    });

    if (!menustatus) {
        throw new Error(createError(404, "Menu status not found"));
    }

    return await prismaClient.menu.create({
        data: menu,
        select: {
            menu_id: true,
            name: true,
            description: true,
            price: true,
            menu_type: {
                select: {
                    menu_type_id: true,
                    name: true,
                },
            },
            menu_status: {
                select: {
                    menu_status_id: true,
                    name: true,
                },
            },
        },
    });
};

const update = async (params, payload) => {
    const menu = validate(upsertMenuSchema, payload);
    const findMenu = await read(params);

    return await prismaClient.menu.update({
        where: {
            menu_id: findMenu.menu_id,
        },
        data: menu,
        select: {
            menu_id: true,
            name: true,
            description: true,
            price: true,
            menu_type: {
                select: {
                    menu_type_id: true,
                    name: true,
                },
            },
            menu_status: {
                select: {
                    menu_status_id: true,
                    name: true,
                },
            },
        },
    });
};

const remove = async (params) => {
    const findMenu = await read(params);

    return prismaClient.menu.delete({
        where: {
            menu_id: findMenu.menu_id,
        },
        select: {
            menu_id: true,
            name: true,
            price: true,
            menu_type: {
                select: {
                    name: true,
                },
            },
            menu_status: {
                select: {
                    name: true,
                },
            },
        },
    });
};

export default { create, list, read, remove, update };
