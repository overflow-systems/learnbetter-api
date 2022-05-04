import { celebrate, Joi, Segments } from 'celebrate';
import { messages } from 'joi-translation-pt-br';
import { AutenticacaoHeader } from './AutenticacaoHeader';

export const EditarUsuarioValidation = celebrate(
  {
    [Segments.HEADERS]: AutenticacaoHeader,
    [Segments.BODY]: Joi.object().keys({
      nome: Joi.string().required(),
      sobrenome: Joi.string().required(),
      data_nascimento: Joi.string().required(),
      celular: Joi.string().min(11).max(11).required(),
      genero: Joi.number().min(1).max(3).required(),
      email: Joi.string().email().required(),
    }),
  },
  {
    messages,
  }
);
