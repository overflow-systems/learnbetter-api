import { celebrate, Joi, Segments } from 'celebrate';
import { messages } from 'joi-translation-pt-br';
import { AutenticacaoHeader } from './AutenticacaoHeader';

export const LerNotificacaoValidation = celebrate(
  {
    [Segments.HEADERS]: AutenticacaoHeader,
    [Segments.QUERY]: Joi.object().keys({
      idnotificacao: Joi.number().required(),
    }),
  },
  {
    messages,
  }
);
