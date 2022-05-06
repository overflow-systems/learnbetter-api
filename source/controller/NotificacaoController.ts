import conexao from '../database/conexao';
import { Request, Response } from 'express';
import { StatusNotificacaoEnum } from '../enum/StatusNotificacaoEnum';
import RetornoErroPadrao from '../utils/RetornoErroPadrao';

class NotificacaoController {
  async buscarNotificacoes(request: Request, response: Response) {
    const { id, tipo } = request.headers;
    const { status }: any = request.query;

    return await conexao
      .select('mensagem', 'data_criacao')
      .from('notificacoes')
      .where(`id_${tipo}`, id)
      .where('status', status)
      .where(query => {
        if (Number(status) == StatusNotificacaoEnum.LIDA)
          query.orWhere('status', StatusNotificacaoEnum.NAO_LIDA);
      })
      .orderBy('data_criacao', 'desc')
      .then(notificacoes => {
        return response.json(notificacoes);
      })
      .catch(() => {
        return RetornoErroPadrao();
      });
  }

  async lerNotificacao(request: Request, response: Response) {
    const { idnotificacao }: any = request.query;

    return await conexao
      .update({ status: StatusNotificacaoEnum.LIDA })
      .into('notificacoes')
      .where('id', idnotificacao)
      .then(() => {
        return response.json({
          status: 200,
          menesagem: 'Status alterado',
        });
      })
      .catch(() => {
        return RetornoErroPadrao();
      });
  }

  async desativarNotificacao(request: Request, response: Response) {
    const { idnotificacao }: any = request.query;

    return await conexao
      .update({ status: StatusNotificacaoEnum.DESATIVADA })
      .into('notificacoes')
      .where('id', idnotificacao)
      .then(() => {
        return response.json({
          status: 200,
          menesagem: 'Notificação desativada',
        });
      })
      .catch(() => {
        return RetornoErroPadrao();
      });
  }
}

export default new NotificacaoController();
