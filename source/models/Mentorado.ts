import { GeneroEnum } from '../utils/GeneroEnum';

export default interface Mentorado {
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
