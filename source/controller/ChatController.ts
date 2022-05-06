import conexao from '../database/conexao';
import { Request, Response } from 'express';
import RetornoErroPadrao from '../utils/RetornoErroPadrao';
import { TipoUsuarioEnum } from '../enum/TipoUsuarioEnum';

class ChatController {
  async buscarChat(request: Request, response: Response) {
    const { id, tipo } = request.headers;

    return await conexao('mensagens')
      .select(
        'mensagens.*',
        'mentor.nome as mentor_nome',
        'mentor.sobrenome as mentor_sobrenome',
        'mentorado.nome as mentorado_nome',
        'mentorado.sobrenome as mentorado_sobrenome'
      )
      .innerJoin('usuarios as mentor', 'mentor.id', 'mensagens.id_mentor')
      .innerJoin(
        'usuarios as mentorado',
        'mentorado.id',
        'mensagens.id_mentorado'
      )
      .where(query => {
        if (tipo == TipoUsuarioEnum.MENTOR)
          query
            .where('mensagens.id_mentor', id)
            .where('mensagens.id_mentorado', request.body.id_mentorado);
        if (tipo == TipoUsuarioEnum.MENTORADO)
          query
            .where('mensagens.id_mentorado', id)
            .where('mensagens.id_mentor', request.body.id_mentor);
      })
      .orderBy('mensagens.data_envio', 'desc')
      .then(mensagens => {
        return response.json(mensagens);
      })
      .catch(() => {
        return RetornoErroPadrao();
      });
  }

  async enviarMensagem(request: Request, response: Response) {
    const { id, tipo } = request.headers;

    return await conexao('mensagens')
      .insert({
        id_mentor: tipo == TipoUsuarioEnum.MENTOR ? id : request.body.id_mentor,
        id_mentorado:
          tipo == TipoUsuarioEnum.MENTORADO ? id : request.body.id_mentorado,
        mensagem: request.body.mensagem,
        tipo_enviado: tipo,
      })
      .then(() => {
        return response.json({
          status: 200,
          mensagem: 'Mensagem enviada com sucesso!',
        });
      })
      .catch(() => {
        return RetornoErroPadrao();
      });
  }

  async listarChats(request: Request, response: Response) {
    const { id, tipo } = request.headers;

    let query: string = '';

    if (tipo == TipoUsuarioEnum.MENTOR) {
      query = `select mensagens.id_mentorado, MAX(mensagens.data_envio) as data_envio, mentorado.* from mensagens
      inner join usuarios as mentorado on mentorado.id = mensagens.id_mentorado
      where mensagens.id_mentor=${id}
      group by mensagens.id_mentorado`;
    }

    if (tipo == TipoUsuarioEnum.MENTORADO) {
      query = `select mensagens.id_mentor, MAX(mensagens.data_envio) as data_envio, mentor.* from mensagens
      inner join usuarios as mentor on mentor.id = mensagens.id_mentor
      where mensagens.id_mentorado=${id}
      group by mensagens.id_mentor`;
    }

    return await conexao
      .raw(query)
      .then(mensagens => {
        return response.json(mensagens[0]);
      })
      .catch(() => {
        return RetornoErroPadrao();
      });
  }
}

export default new ChatController();
