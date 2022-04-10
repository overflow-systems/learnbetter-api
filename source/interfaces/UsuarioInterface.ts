import { TipoUsuarioEnum } from '../enum/TipoUsuarioEnum';

export default interface UsuarioInterface {
  id?: number;
  email: string;
  senha: string;
  tipoUsuario: TipoUsuarioEnum;
}
