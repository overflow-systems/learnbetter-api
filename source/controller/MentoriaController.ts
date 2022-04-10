import knex from '../database/connection';
import RetornoErroPadrao from '../utils/RetornoErroPadrao';

class MentoriaController {
  async buscarQuantidade(request, response) {
    const { id, tipo, status } = request.headers;

    await knex
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

  buscarMentoriaUsuario(request, response) {
    const { id, tipo, status } = request.headers;

    knex
      .select('*')
      .from('mentorias')
      .where(`id_${tipo}`, id)
      .where('status', status)
      .then(mentorias => {
        return response.json(mentorias);
      });
  }

  buscarMentoriaTags(request, response) {
    const { id, tipo, status } = request.headers;

    knex
      .select('*')
      .from('mentorias')
      .where(`id_${tipo}`, id)
      .where('status', status)
      .then(mentorias => {
        return response.json(mentorias);
      });
  }
}

export default new MentoriaController();
