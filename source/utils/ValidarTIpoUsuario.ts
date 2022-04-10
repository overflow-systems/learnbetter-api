import { TipoUsuarioEnum } from '../enum/TipoUsuarioEnum';
import StatusMensagemInterface from '../interfaces/StatusMensagemInterface';
import UsuarioInterface from '../interfaces/UsuarioInterface';

export default function ValidarTipoUsuario(tipo): StatusMensagemInterface {
  switch (true) {
    case tipo == 'mentor':
      return { status: 200, mensagem: TipoUsuarioEnum.MENTOR };
    case tipo == 'mentorado':
      return { status: 200, mensagem: TipoUsuarioEnum.MENTORADO };
    default:
      return { status: 400, mensagem: 'Tipo de usuário inválido' };
  }
}
