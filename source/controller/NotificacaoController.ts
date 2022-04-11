import conexao from '../database/conexao';
import { Request, Response } from 'express';
import { StatusNotificacaoEnum } from '../enum/StatusNotificacaoEnum';
import RetornoErroPadrao from '../utils/RetornoErroPadrao';

class NotificacaoController {
  async buscarNotificacoes(request: Request, response: Response) {
    const { id, tipo, status } = request.headers;

    const statusNotificacao: StatusNotificacaoEnum =
      StatusNotificacaoEnum[status[0]];

    const notificacoes = await conexao
      .select('mensagem', 'data_criacao')
      .from('notificacoes')
      .where(`id_${tipo}`, id)
      .where('status', status)
      .where(query => {
        if (statusNotificacao === StatusNotificacaoEnum.LIDA)
          query.orWhere('status', StatusNotificacaoEnum.NAO_LIDA);
      })
      .orderBy('data_criacao', 'desc');

    return response.json(notificacoes);
  }

  async lerNotificacao(request: Request, response: Response) {
    const { idnotificacao } = request.headers;

    await conexao
      .update({ status: StatusNotificacaoEnum.LIDA })
      .into('notificacoes')
      .where('id', idnotificacao)
      .then(() => {
        return response.json({
          status: 200,
          menesagem: 'Status alterado',
        });
      });

    return RetornoErroPadrao();
  }

  async desativarNotificacao(request: Request, response: Response) {
    const { idnotificacao } = request.headers;

    await conexao
      .update({ status: StatusNotificacaoEnum.DESATIVADA })
      .into('notificacoes')
      .where('id', idnotificacao)
      .then(() => {
        return response.json({
          status: 200,
          menesagem: 'Notificação desativada',
        });
      });

    return RetornoErroPadrao();
  }
}

export default new NotificacaoController();
