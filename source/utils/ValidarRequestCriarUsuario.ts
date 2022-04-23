import conexao from '../database/conexao';
import StatusMensagemInterface from '../interfaces/StatusMensagemInterface';
import Usuario from '../models/Usuario';

export default async function ValidarRequestCriarUsuario(
  celular: string,
  email: string,
  tipo: any
): Promise<StatusMensagemInterface> {
  if (tipo != 'mentor' && tipo != 'mentorado')
    return { status: 400, mensagem: 'Tipo de usuário inválido' };

  if (
    await conexao
      .select('celular')
      .from<Usuario>('usuarios')
      .where('celular', celular)
      .orWhere('email', email)
      .first()
  )
    return { status: 400, mensagem: 'E-mail e/ou celular em uso' };

  return { status: 200, mensagem: 'OK' };
}
