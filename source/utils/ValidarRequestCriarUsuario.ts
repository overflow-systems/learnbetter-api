import knex from '../database/connection';
import StatusMensagemInterface from '../interfaces/StatusMensagemInterface';
import Usuario from '../models/Usuario';

export default async function ValidarRequestCriarUsuario(
  celular: string,
  email: string,
  mentor: boolean,
  mentorado: boolean
): Promise<StatusMensagemInterface> {
  if ((!mentor && !mentorado) || (mentor && mentorado))
    return { status: 400, mensagem: 'Tipo de usuário inválido' };

  if (
    await knex
      .select('celular')
      .from<Usuario>('usuarios')
      .where('celular', celular)
      .orWhere('email', email)
      .first()
  )
    return { status: 400, mensagem: 'E-mail e/ou celular em uso' };

  return { status: 200, mensagem: 'OK' };
}
