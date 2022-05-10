import { TipoUsuarioEnum } from '../enum/TipoUsuarioEnum';

export default interface Mensagem {
  id?: number;
  mensagem: string;
  data_envio?: Date;
  tipo_enviado: TipoUsuarioEnum;
  id_mentor: number;
  id_mentorado: number;
}
