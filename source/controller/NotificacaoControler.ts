import knex from '../database/connection';
import { StatusNotificacaoEnum } from '../enum/StatusNotificacaoEnum';
import { TabelaUsuarioEnum } from '../enum/TabelaUsuarioEnum';
import BuscarTabelaTipoUsuario from '../utils/BuscarTabelaTipoUsuario';

class NotificacaoController {
	async buscarNovasNotificacoes(request, response) {
		const { id, tipo } = request.headers;

		const tabela: TabelaUsuarioEnum = BuscarTabelaTipoUsuario(tipo);

		const usuario = await knex.select('id').from(tabela).where('id', id).first();

		if (!usuario.id) return response.json({ status: 400, mensagem: 'Usuário não encontrado' });

		const notificacoes = await knex('notificacoes').where(`id_${tipo}`, id).where('status', StatusNotificacaoEnum.NAO_LIDA).orderBy('data_criacao', 'desc');

		return response.json(notificacoes);
	}
}

export default new NotificacaoController();
