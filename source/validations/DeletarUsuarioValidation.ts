import { celebrate, Segments } from 'celebrate';
import { messages } from 'joi-translation-pt-br';
import { AutenticacaoHeader } from './AutenticacaoHeader';

export const DeletarUsuarioValidation = celebrate(
  {
    [Segments.HEADERS]: AutenticacaoHeader,
  },
  {
    messages,
  }
);
