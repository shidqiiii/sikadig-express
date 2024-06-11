import Joi from "joi";

export const upsertRoleSchema = Joi.object({
    name: Joi.string().required(),
});
