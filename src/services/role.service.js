import createError from "http-errors";
import { prismaClient } from "../utils/prisma.js";
import { upsertRoleSchema } from "../validations/role.validation.js";
import { validate } from "../validations/validate.js";

const list = async (query) => {
    const { limit = 10, offset = 0 } = query;

    return await prismaClient.role.findMany({
        skip: parseInt(offset),
        take: parseInt((offset - 1) * limit),
        select: {
            role_id: true,
            name: true,
        },
    });
};

const read = async (params) => {
    const role = await prismaClient.role.findUnique({
        where: {
            role_id: params.role_id,
        },
        select: {
            role_id: true,
            name: true,
        },
    });

    if (!role) {
        throw new Error(createError(404, "Role not found"));
    }

    return role;
};

const create = async (payload) => {
    const role = await validate(upsertRoleSchema, payload);

    return await prismaClient.role.create({
        data: role,
        select: {
            role_id: true,
            name: true,
        },
    });
};

const update = async (params, payload) => {
    const role = validate(upsertRoleSchema, payload);
    const findRole = await read(params);

    return await prismaClient.role.update({
        where: {
            role_id: findRole.role_id,
        },
        data: role,
        select: {
            role_id: true,
            name: true,
        },
    });
};

const remove = async (params) => {
    const findRole = await read(params);

    return prismaClient.role.delete({
        where: {
            role_id: findRole.role_id,
        },
        select: {
            role_id: true,
            name: true,
        },
    });
};

export default { create, list, read, remove, update };
