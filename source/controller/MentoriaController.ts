import conexao from '../database/conexao';
import { Request, Response } from 'express';
import RetornoErroPadrao from '../utils/RetornoErroPadrao';

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
}

export default new MentoriaController();
