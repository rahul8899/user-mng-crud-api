import Joi from "joi";

export const productSchema = Joi.object({
    name: Joi.string().required(),
    category_id: Joi.number().integer().required(),
    price: Joi.number().integer().optional().allow(null),
    details: Joi.string().optional().allow(null),
});