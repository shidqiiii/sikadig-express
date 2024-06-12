import Joi from "joi";

export const upsertMenuSchema = Joi.object({
    name: Joi.string().required(),
    description: Joi.string().required(),
    price: Joi.number().required(),
    menu_type_id: Joi.string().required(),
    menu_status_id: Joi.number().required(),
});
