import Joi from "joi";

export const registerUserSchema = Joi.object({
    name: Joi.string().required(),
    email: Joi.string().email().required(),
    password: Joi.string().required(),
    confirm_password: Joi.any().valid(Joi.ref("password")).required(),
    role_id: Joi.string().required(),
    user_status_id: Joi.number().required(),
});

export const updateUserSchema = Joi.object({
    name: Joi.string().required(),
    email: Joi.string().email().required(),
    password: Joi.string().optional(),
    confirm_password: Joi.string().when("password", {
        is: Joi.exist(),
        then: Joi.string().valid(Joi.ref("password")).required(),
    }),
    role_id: Joi.string().required(),
    user_status_id: Joi.number().required(),
});

export const loginUserSchema = Joi.object({
    email: Joi.string().email().required(),
    password: Joi.string().required(),
});
