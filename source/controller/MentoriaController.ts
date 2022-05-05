import conexao from '../database/conexao';
import { Request, Response } from 'express';
import RetornoErroPadrao from '../utils/RetornoErroPadrao';
import MentorInterface from '../interfaces/MentorInterface';
import Mentoria from '../models/Mentoria';
import { StatusMentoriaEnum } from '../enum/StatusMentoriaEnum';
import { TipoUsuarioEnum } from '../enum/TipoUsuarioEnum';
import { StatusMentorMentoradoEnum } from '../enum/StatusMentorMentoradoEnum';

class MentoriaController {
  async buscarQuantidade(request: Request, response: Response) {
    const { id, tipo } = request.headers;
    const { status }: any = request.query;

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
    const { id, tipo } = request.headers;
    const { status }: any = request.query;

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
    const { tipo } = request.headers;
    const { idmentor }: any = request.query;

    if (tipo == 'mentor')
      return response.json({ status: 401, messagem: 'Não autorizado' });

    await conexao
      .select('*')
      .from<MentorInterface>('usuarios')
      .where('id', idmentor)
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
      return response.json({ status: 401, messagem: 'Não autorizado' });

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
      return response.json({ status: 401, messagem: 'Não autorizado' });

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
        .where({
          id: idmentoria,
          id_mentor: id,
          status: StatusMentoriaEnum.FINALIZADA,
        })
        .then(resultado => {
          return response.json({ status: 200, mensagem: resultado });
        });
    }
    if (tipo == TipoUsuarioEnum.MENTORADO) {
      await conexao
        .update({ avaliacao_mentor: avaliacao })
        .into('mentorias')
        .where({
          id: idmentoria,
          id_mentorado: id,
          status: StatusMentoriaEnum.FINALIZADA,
        })
        .then(resultado => {
          return response.json({ status: 200, mensagem: resultado });
        });
    }

    return RetornoErroPadrao();
  }

  async buscarMentores(request: Request, response: Response) {
    const { id, tipo } = request.headers;

    if (tipo == TipoUsuarioEnum.MENTOR)
      return response.json({ status: 401, messagem: 'Não autorizado' });

    const colunas = `COUNT(DISTINCT tags.id) as score,
                     CONCAT(mentor.nome, ' ', mentor.sobrenome) as nome,
                     GROUP_CONCAT(DISTINCT tags.nome) as tags,
                     mentor.data_criacao,
                     ROUND(AVG(mentorias.avaliacao_mentor), 2) as nota,
                     mentor.apresentacao,
                     COUNT(mentorias.id) as quantidade_mentoria,
                     ROUND((AVG(mentorias.avaliacao_mentor) * 100) / 5, 2) as satisfacao`;

    const query = `select ${colunas}
                     from usuarios as mentor
                     inner join usuarios_tags mentor_ut on mentor_ut.id_mentor = mentor.id
                     inner join usuarios_tags mentorado_ut on mentorado_ut .id_mentorado = ${id}
                     inner join tags on tags.id = mentor_ut.id_tag
                     left join mentorias on mentorias.id_mentor = mentor.id
                     left join mentor_mentorado amr on amr.id_mentor = mentor.id and amr.id_mentorado = ${id} and amr.status <> ${StatusMentorMentoradoEnum.RECUSADO}
                     where mentor.mentor=true and mentorado_ut.id_tag = mentor_ut.id_tag
                   group by mentor.id
                     order by score desc, nota desc;`;

    await conexao.raw(query).then(resultado => {
      return response.json(resultado[0]);
    });

    return RetornoErroPadrao();
  }
}

export default new MentoriaController();
