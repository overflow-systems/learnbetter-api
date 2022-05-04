import { celebrate, Joi, Segments } from 'celebrate';
import { messages } from 'joi-translation-pt-br';
import { AutenticacaoHeader } from './AutenticacaoHeader';

export const BuscarNotificacoesValidation = celebrate(
  {
    [Segments.HEADERS]: AutenticacaoHeader,
    [Segments.QUERY]: Joi.object().keys({
      status: Joi.number().required(),
    }),
  },
  {
    messages,
  }
);
