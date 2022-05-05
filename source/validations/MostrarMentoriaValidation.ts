import { celebrate, Joi, Segments } from 'celebrate';
import { messages } from 'joi-translation-pt-br';
import { AutenticacaoHeader } from './AutenticacaoHeader';

export const MostrarMentoriaValidation = celebrate(
  {
    [Segments.HEADERS]: AutenticacaoHeader,
    [Segments.QUERY]: Joi.object().keys({
      idmentor: Joi.number().required(),
    }),
  },
  {
    messages,
  }
);
