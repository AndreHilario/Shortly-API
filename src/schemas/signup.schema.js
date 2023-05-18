import Joi from "joi";

export const signupSchema = Joi.object({
    name: Joi.string().trim().required(),
    email: Joi.string().trim().email().required(),
    password: Joi.string().trim().min(4).required().messages({
        'string.min': 'A senha deve ter no mínimo 4 caracteres.',
        'any.required': 'A senha é obrigatória.',
    }),
    confirmPassword: Joi.string().trim().valid(Joi.ref('password')).required().messages({
        'any.only': 'A confirmação da senha deve ser igual à senha escolhida.',
        'any.required': 'A confirmação da senha é obrigatória.',
    }),
});
