import Joi from "joi";

export const upsertMenutypeSchema = Joi.object({
    name: Joi.string().required(),
});
