import { celebrate, Joi, Segments } from 'celebrate';
import { messages } from 'joi-translation-pt-br';
import { AutenticacaoHeader } from './AutenticacaoHeader';

export const BuscarMentoresValidation = celebrate(
  {
    [Segments.HEADERS]: AutenticacaoHeader,
  },
  {
    messages,
  }
);
