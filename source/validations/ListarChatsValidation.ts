import { celebrate, Joi, Segments } from 'celebrate';
import { messages } from 'joi-translation-pt-br';
import { AutenticacaoHeader } from './AutenticacaoHeader';

export const ListarChatsValidation = celebrate(
  {
    [Segments.HEADERS]: AutenticacaoHeader,
  },
  {
    messages,
  }
);
