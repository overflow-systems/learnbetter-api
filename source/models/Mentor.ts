import { GeneroEnum } from '../enum/GeneroEnum';

export default interface Mentor {
	id?: number;
	nome: string;
	sobrenome: string;
	data_nascimento: string;
	email: string;
	celular: string;
	senha?: string;
	genero: GeneroEnum;
	apresentacao: string;
	data_criacao?: Date;
	data_ultima_atualizacao?: Date;
}
