import { Request, Response } from 'express';
import StatusMensagemInterface from '../interfaces/StatusMensagemInterface';
import ValidarToken from '../utils/ValidarToken';

export default async function AutenticacaoMiddleware(
  request: Request,
  response: Response,
  next
) {
  const { id, token } = request.headers;

  const tokenValidado: StatusMensagemInterface = await ValidarToken(id, token);

  if (tokenValidado.status === 200) next();
  if (tokenValidado.status === 401)
    response.json({ status: 401, mensagem: 'Não autorizado' });
}
