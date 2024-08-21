import Joi from 'joi';

export const User = Joi.object({
    username: Joi.string().min(5).max(20).required(),
    email : Joi.string()
    .pattern(new RegExp('^[\\w-\\.]+@([\\w-]+\\.)+[\\w-]{2,4}$'))
    .min(10).max(250).required(),
    password : Joi.string().min(8).max(40).required()
})

export const Admin = Joi.object({
    username: Joi.string().min(5).max(20).required(),
    email : Joi.string()
    .pattern(new RegExp('^[\\w-\\.]+@([\\w-]+\\.)+[\\w-]{2,4}$'))
    .message('Please enter a valid email address')
    .min(20).max(250).required(),
    password : Joi.string().min(8).max(40).required()
})

export const Product = Joi.object({
    name: Joi.string().required(),
    price : Joi.number().required(),
    model : Joi.string().required(),
    description : Joi.string().required(),
    image_id : Joi.string().required()
})