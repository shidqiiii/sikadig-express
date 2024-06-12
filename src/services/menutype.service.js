import { upsertMenutypeSchema } from "../validations/menutype.validation.js";
import { validate } from "../validations/validate.js";
import { prismaClient } from "../utils/prisma.js";
import createError from "http-errors";

const list = async (query) => {
    const { limit = 10, offset = 0 } = query;
    const count = await prismaClient.menuType.count();

    const menuType = await prismaClient.menuType.findMany({
        skip: parseInt(offset),
        take: parseInt((offset - 1) * limit),
        select: {
            menu_type_id: true,
            name: true,
        },
    });

    return { total_data: count, menu_type: menuType };
};

const read = async (params) => {
    const menutype = await prismaClient.menuType.findUnique({
        where: {
            menu_type_id: params.menu_type_id,
        },
        select: {
            menu_type_id: true,
            name: true,
        },
    });

    if (!menutype) {
        throw new Error(createError(404, "Menu type not found"));
    }

    return menutype;
};

const create = async (payload) => {
    const menutype = await validate(upsertMenutypeSchema, payload);

    return await prismaClient.menuType.create({
        data: menutype,
        select: {
            menu_type_id: true,
            name: true,
        },
    });
};

const update = async (params, payload) => {
    const menutype = validate(upsertMenutypeSchema, payload);
    const findMenutype = await read(params);

    return await prismaClient.menuType.update({
        where: {
            menu_type_id: findMenutype.menu_type_id,
        },
        data: menutype,
        select: {
            menu_type_id: true,
            name: true,
        },
    });
};

const remove = async (params) => {
    const findMenutype = await read(params);

    return prismaClient.menuType.delete({
        where: {
            menu_type_id: findMenutype.menu_type_id,
        },
        select: {
            menu_type_id: true,
            name: true,
        },
    });
};

export default { create, list, read, remove, update };
