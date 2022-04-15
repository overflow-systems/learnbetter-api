import { GeneroEnum } from '../enum/GeneroEnum';

export default interface MentorInterface {
  id: number;
  nome: string;
  sobrenome: string;
  data_nascimento: string;
  email: string;
  celular: string;
  genero: GeneroEnum;
  apresentacao?: string;
  avaliacao?: number;
}
