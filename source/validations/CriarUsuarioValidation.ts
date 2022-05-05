import { celebrate, Joi, Segments } from 'celebrate';
import { messages } from 'joi-translation-pt-br';

export const CriarUsuarioValidation = celebrate(
  {
    [Segments.BODY]: Joi.object().keys({
      nome: Joi.string().required(),
      sobrenome: Joi.string().required(),
      data_nascimento: Joi.string().required(),
      celular: Joi.string().min(9).max(13).required(),
      cpf: Joi.string().min(11).max(11).required(),
      email: Joi.string().email().required(),
      senha: Joi.string().required(),
      genero: Joi.number().min(1).max(3).required(),
      tipo: Joi.string().required(),
      tags: Joi.array().items(Joi.number()),
    }),
  },
  {
    messages,
  }
);
