import conexao from '../database/conexao';
import StatusMensagemInterface from '../interfaces/StatusMensagemInterface';
import Usuario from '../models/Usuario';

export default async function ValidarToken(
  id,
  token,
  tipo
): Promise<StatusMensagemInterface> {
  const usuario: Usuario = await conexao
    .select('*')
    .from<Usuario>('usuarios')
    .where({ id: id, token: token })
    .first();

  if (!usuario) return { status: 401, mensagem: 'Usuário não logado' };

  return { status: 200, mensagem: 'Usuário logado' };
}
