import Joi from "joi";

export const signupSchema = Joi.object({
    name: Joi.string().trim().required(),
    email: Joi.string().trim().email().required(),
    password: Joi.string().trim().required(),
    confirmPassword: Joi.string().trim().valid(Joi.ref('password')).required().messages({
        'any.only': 'A confirmação da senha deve ser igual à senha escolhida.',
        'any.required': 'A confirmação da senha é obrigatória.',
    }),
});
