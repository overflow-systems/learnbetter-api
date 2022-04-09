import knex from '../database/connection';
import { TabelaUsuarioEnum } from '../enum/TabelaUsuarioEnum';
import { TipoUsuarioEnum } from '../enum/TipoUsuarioEnum';

import VerificarEmailCelularInterface from '../interfaces/VerificarEmailCelularInterface';
import BuscarTabelaTipoUsuario from './BuscarTabelaTipoUsuario';

export default async function VerificarEmailCelular(tipo: TipoUsuarioEnum, celular: string, email: string): Promise<VerificarEmailCelularInterface> {

	const tabela: TabelaUsuarioEnum = BuscarTabelaTipoUsuario(tipo);
	

	if (await knex.select('celular').from(tabela).where('celular', celular).first()) return { status: 400, mensagem: 'Celular já utilizado' };

	if (await knex.select('email').from(tabela).where('email', email).first()) return { status: 400, mensagem: 'E-mail já utilizado' };

	return { status: 200, mensagem: 'OK' };
}
