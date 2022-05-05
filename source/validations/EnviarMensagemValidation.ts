import { celebrate, Joi, Segments } from 'celebrate';
import { messages } from 'joi-translation-pt-br';
import { AutenticacaoHeader } from './AutenticacaoHeader';

export const EnviarMensagemValidation = celebrate(
  {
    [Segments.HEADERS]: AutenticacaoHeader,
    [Segments.BODY]: Joi.object().keys({
      id_mentor: Joi.number(),
      id_mentorado: Joi.number(),
      mensagem: Joi.string().required(),
    }),
  },
  {
    messages,
  }
);
