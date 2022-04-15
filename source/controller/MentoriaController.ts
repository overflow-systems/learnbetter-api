import conexao from '../database/conexao';
import { Request, Response } from 'express';
import RetornoErroPadrao from '../utils/RetornoErroPadrao';
import MentorInterface from '../interfaces/MentorInterface';

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
        mentor.avaliacao = await conexao
          .avg('avaliacao_mentor as avaliacao')
          .from('mentorias')
          .where('id_mentor', mentor.id)
          .first();
        return response.json(mentor);
      });
  }
}

export default new MentoriaController();
