import knex from '../database/connection';
import { StatusNotificacaoEnum } from '../enum/StatusNotificacaoEnum';
import { TabelaUsuarioEnum } from '../enum/TabelaUsuarioEnum';

class NotificacaoController {
  async buscarNotificacoes(request, response) {
    const { id, tipo, status } = request.headers;

    const tabela: TabelaUsuarioEnum = BuscarTabelaTipoUsuario(tipo);

    const usuario = await knex
      .select('id')
      .from(tabela)
      .where('id', id)
      .first();

    if (!usuario.id)
      return response.json({ status: 400, mensagem: 'Usuário não encontrado' });

    const notificacoes = await knex
      .select('mensagem', 'data_criacao')
      .from('notificacoes')
      .where(`id_${tipo}`, id)
      .where('status', status)
      .orderBy('data_criacao', 'desc');

    return response.json(notificacoes);
  }
}

export default new NotificacaoController();
