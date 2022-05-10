import { TipoUsuarioEnum } from '../enum/TipoUsuarioEnum';

export default interface UsuarioInterface {
  id?: number;
  email: string;
  senha: string;
  socket_id?: string;
  tipoUsuario?: TipoUsuarioEnum;
  mentorado?: boolean;
  mentor?: boolean;
}
