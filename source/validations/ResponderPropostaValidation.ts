import { celebrate, Joi, Segments } from 'celebrate';
import { messages } from 'joi-translation-pt-br';
import { AutenticacaoHeader } from './AutenticacaoHeader';

export const ResponderPropostaValidation = celebrate(
  {
    [Segments.HEADERS]: AutenticacaoHeader,
    [Segments.BODY]: Joi.object().keys({
      status: Joi.number().required(),
      idmentoria: Joi.number().required(),
    }),
  },
  {
    messages,
  }
);
