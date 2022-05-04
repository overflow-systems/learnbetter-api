import { celebrate, Segments } from 'celebrate';
import { messages } from 'joi-translation-pt-br';
import { AutenticacaoHeader } from './AutenticacaoHeader';

export const AlterarTipoContaValidation = celebrate(
  {
    [Segments.HEADERS]: AutenticacaoHeader,
  },
  {
    messages,
  }
);
