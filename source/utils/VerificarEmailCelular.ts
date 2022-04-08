import knex from '../database/connection';

import VerificarEmailCelularInterface from '../interfaces/VerificarEmailCelularInterface';

export default async function VerificarEmailCelular(tipo: string, celular: string, email: string): Promise<VerificarEmailCelularInterface> {
	let tabela: string;

	if (tipo === 'mentorado') tabela = 'mentorados';
	else if (tipo === 'mentor') tabela = 'mentores';
	else return { status: 400, message: 'Tipo de usuário inválido' };

	if (await knex.select('celular').from(tabela).where('celular', celular).first()) return { status: 400, message: 'Celular já utilizado' };

	if (await knex.select('email').from(tabela).where('email', email).first()) return { status: 400, message: 'E-mail já utilizado' };

	return { status: 200, message: 'OK' };
}
