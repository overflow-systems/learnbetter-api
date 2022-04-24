import conexao from '../database/conexao';
import { Request, Response } from 'express';
import RetornoErroPadrao from '../utils/RetornoErroPadrao';
import { TipoUsuarioEnum } from '../enum/TipoUsuarioEnum';

class ChatController {
  async buscarChat(request: Request, response: Response) {
    const { id, tipo } = request.headers;

    await conexao('mensagens')
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
      });

    return RetornoErroPadrao();
  }
}

export default new ChatController();
