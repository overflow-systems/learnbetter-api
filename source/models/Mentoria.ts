import { StatusMentoriaEnum } from '../enum/StatusMentoriaEnum';

export default interface Mentoria {
  id: number;
  id_mentor: number;
  id_mentorado: number;
  avaliacao_mentorado: number;
  avaliacao_mentor: number;
  data_inicio: Date;
  data_fim: Date;
  status: StatusMentoriaEnum;
}
