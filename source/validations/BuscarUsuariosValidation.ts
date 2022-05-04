import { celebrate, Joi, Segments } from 'celebrate';
import { messages } from 'joi-translation-pt-br';
import { AutenticacaoHeader } from './AutenticacaoHeader';

export const BuscarUsuariosValidation = celebrate(
  {
    [Segments.HEADERS]: AutenticacaoHeader,
  },
  {
    messages,
  }
);
