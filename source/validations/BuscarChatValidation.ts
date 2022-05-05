import { celebrate, Joi, Segments } from 'celebrate';
import { messages } from 'joi-translation-pt-br';
import { AutenticacaoHeader } from './AutenticacaoHeader';

export const BuscarChatValidation = celebrate(
  {
    [Segments.HEADERS]: AutenticacaoHeader,
    [Segments.BODY]: Joi.object().keys({
      id_mentorado: Joi.number(),
      id_mentor: Joi.number().required(),
    }),
  },
  {
    messages,
  }
);
