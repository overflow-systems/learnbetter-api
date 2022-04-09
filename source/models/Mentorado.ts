import { GeneroEnum } from '../enum/GeneroEnum';

export default interface Mentorado {
  id?: number;
  nome: string;
  sobrenome: string;
  data_nascimento: string;
  email: string;
  celular: string;
  senha?: string;
  genero: GeneroEnum;
  data_criacao?: Date;
  data_ultima_atualizacao?: Date;
}
