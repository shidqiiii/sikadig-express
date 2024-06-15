import bcrypt from "bcrypt";
import createError from "http-errors";
import { prismaClient } from "../utils/prisma.js";
import { loginUserSchema, registerUserSchema, updateUserSchema } from "../validations/user.validation.js";
import { validate } from "../validations/validate.js";

const list = async (query) => {
    const { limit = 10, offset = 0 } = query;
    const count = await prismaClient.user.count();

    const user = await prismaClient.user.findMany({
        skip: parseInt(offset),
        take: parseInt(limit),
        select: {
            user_id: true,
            name: true,
            email: true,
            role: {
                select: {
                    name: true,
                },
            },
            user_status: {
                select: {
                    name: true,
                },
            },
        },
    });
    console.log(user);

    return { total_data: count, user };
};

const read = async (params) => {
    const user = await prismaClient.user.findUnique({
        where: {
            user_id: params.user_id,
        },
        select: {
            user_id: true,
            name: true,
            email: true,
            role: {
                select: {
                    role_id: true,
                    name: true,
                },
            },
            user_status: {
                select: {
                    user_status_id: true,
                    name: true,
                },
            },
        },
    });

    if (!user) {
        throw new Error(createError(404, "User not found"));
    }

    return user;
};

const register = async (payload) => {
    const user = await validate(registerUserSchema, payload);

    const findUser = await prismaClient.user.findUnique({
        where: {
            email: user.email,
        },
    });

    if (findUser) {
        throw new Error(createError(404, "Email already used before"));
    }

    user.password = bcrypt.hashSync(user.password, 10);
    const { confirm_password, ...data } = user;

    return await prismaClient.user.create({
        data: data,
        select: {
            user_id: true,
            name: true,
            email: true,
            role: {
                select: {
                    role_id: true,
                    name: true,
                },
            },
            user_status: {
                select: {
                    user_status_id: true,
                    name: true,
                },
            },
        },
    });
};

const update = async (params, payload) => {
    const user = validate(updateUserSchema, payload);
    const findUser = await read(params);

    if (user.password) {
        user.password = bcrypt.hashSync(user.password, 10);
    }
    const { confirm_password, ...data } = user;

    return await prismaClient.user.update({
        where: {
            user_id: findUser.user_id,
        },
        data: data,
        select: {
            user_id: true,
            name: true,
            email: true,
            role: {
                select: {
                    role_id: true,
                    name: true,
                },
            },
            user_status: {
                select: {
                    user_status_id: true,
                    name: true,
                },
            },
        },
    });
};

const login = async (payload) => {
    const user = await validate(loginUserSchema, payload);

    const findUser = await prismaClient.user.findUnique({
        where: {
            email: user.email,
        },
        select: {
            user_id: true,
            name: true,
            email: true,
            password: true,
            role: {
                select: {
                    name: true,
                },
            },
        },
    });

    if (!findUser) {
        throw new Error(createError(404, "Email or password is incorrect"));
    }

    const checkPassword = bcrypt.compareSync(user.password, findUser.password);

    if (!checkPassword) {
        throw new Error(createError(404, "Email or password is incorrect"));
    }

    const { password, ...data } = findUser;
    return data;
};

export default { list, login, read, register, update };
