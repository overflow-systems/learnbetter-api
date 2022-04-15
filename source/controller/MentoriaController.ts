import conexao from '../database/conexao';
import { Request, Response } from 'express';
import RetornoErroPadrao from '../utils/RetornoErroPadrao';
import MentorInterface from '../interfaces/MentorInterface';
import Mentoria from '../models/Mentoria';
import { StatusMentoriaEnum } from '../enum/StatusMentoriaEnum';
import { TipoUsuarioEnum } from '../enum/TipoUsuarioEnum';

class MentoriaController {
  async buscarQuantidade(request: Request, response: Response) {
    const { id, tipo, status } = request.headers;

    await conexao
      .count('id as quantidade')
      .from('mentorias')
      .where(`id_${tipo}`, id)
      .where('status', status)
      .first()
      .then(({ quantidade }) => {
        return response.json(quantidade);
      });

    return RetornoErroPadrao();
  }

  async buscarMentoriaUsuario(request: Request, response: Response) {
    const { id, tipo, status } = request.headers;

    await conexao
      .select('*')
      .from('mentorias')
      .where(`id_${tipo}`, id)
      .where('status', status)
      .then(mentorias => {
        return response.json(mentorias);
      });

    return RetornoErroPadrao();
  }

  async buscarMentoriaTags(request: Request, response: Response) {
    const { id, tipo, status } = request.headers;

    await conexao
      .select('*')
      .from('mentorias')
      .where(`id_${tipo}`, id)
      .where('status', status)
      .then(mentorias => {
        return response.json(mentorias);
      });

    return RetornoErroPadrao();
  }

  async mostrarMentoria(request: Request, response: Response) {
    if (request.headers.tipo == 'mentor')
      return response.json({ status: 401, message: 'Não autorizado' });

    await conexao
      .select('*')
      .from<MentorInterface>('usuarios')
      .where('id', request.headers.idmentor)
      .first()
      .then(async (mentor: MentorInterface) => {
        const resultado = await conexao
          .avg('avaliacao_mentor as avaliacao')
          .from('mentorias')
          .where('id_mentor', mentor.id)
          .first();
        mentor.avaliacao = resultado.avaliacao;
        return response.json(mentor);
      });

    return RetornoErroPadrao();
  }

  async enviarProposta(request: Request, response: Response) {
    const { id, tipo } = request.headers;

    if (tipo == 'mentor')
      return response.json({ status: 401, message: 'Não autorizado' });

    const mentoria: Mentoria = {
      id_mentor: request.body.idmentor,
      id_mentorado: Number(id),
      texto_proposta: request.body.texto_proposta ?? null,
      status: StatusMentoriaEnum.AGUARDANDO,
    };

    await conexao
      .insert(mentoria)
      .into('mentorias')
      .then(resultado => {
        return response.json(resultado);
      });

    return RetornoErroPadrao();
  }

  async responderProposta(request: Request, response: Response) {
    const { id, tipo } = request.headers;

    if (tipo == 'mentorado')
      return response.json({ status: 401, message: 'Não autorizado' });

    await conexao
      .update({ status: request.body.status })
      .from('mentorias')
      .where({ id: request.body.idmentoria, id_mentor: id })
      .then(resultado => {
        return response.json({ status: 200, mensagem: resultado });
      });

    return RetornoErroPadrao();
  }

  async avaliarMentoria(request: Request, response: Response) {
    const { id, tipo } = request.headers;
    const { idmentoria, avaliacao } = request.body;

    if (tipo == TipoUsuarioEnum.MENTOR) {
      await conexao
        .update({ avaliacao_mentorado: avaliacao })
        .into('mentorias')
        .where({ id: idmentoria, id_mentor: id, status: StatusMentoriaEnum.FINALIZADA })
        .then(resultado => {
          return response.json({ status: 200, mensagem: resultado });
        });
    }
    if (tipo == TipoUsuarioEnum.MENTORADO) {
      await conexao
        .update({ avaliacao_mentor: avaliacao })
        .into('mentorias')
        .where({ id: idmentoria, id_mentorado: id, status: StatusMentoriaEnum.FINALIZADA })
        .then(resultado => {
          return response.json({ status: 200, mensagem: resultado });
        });
    }

    return RetornoErroPadrao();
  }
}

export default new MentoriaController();
