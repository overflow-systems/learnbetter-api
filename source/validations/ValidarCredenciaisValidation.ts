import { celebrate, Joi, Segments } from 'celebrate';
import { messages } from 'joi-translation-pt-br';

export const ValidarCredenciaisValidation = celebrate(
  {
    [Segments.BODY]: Joi.object().keys({
      celular: Joi.string().required(),
      email: Joi.string().email().required(),
      tipo: Joi.string().required(),
    }),
  },
  {
    messages,
  }
);
