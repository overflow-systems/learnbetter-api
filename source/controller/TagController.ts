import conexao from '../database/conexao';
import { Request, Response } from 'express';
import RetornoErroPadrao from '../utils/RetornoErroPadrao';
import { TipoUsuarioEnum } from '../enum/TipoUsuarioEnum';
import Tag from '../models/Tag';
import UsuarioTags from '../models/UsuarioTags';

class TagController {
  async listarTags(request: Request, response: Response) {
    const { id, tipo } = request.headers;

    await conexao
      .select('*')
      .from<Tag>('tags')
      .then(tags => {
        return response.json(tags);
      });

    return RetornoErroPadrao();
  }

  async editarTags(request: Request, response: Response) {
    const { id, tipo } = request.headers;

    if (tipo == TipoUsuarioEnum.MENTOR) {
      const tagsUsuario: UsuarioTags[] = request.body.tags.map(tag => ({
        id_mentor: id,
        id_tag: tag,
      }));

      return await conexao
        .delete()
        .from('usuarios_tags')
        .where({ id_mentor: id })
        .then(async () => {
          await conexao
            .insert(tagsUsuario)
            .into('usuarios_tags')
            .then(() => {
              return response.json({
                status: 200,
                mensagem: 'Tags atualizadas com sucesso',
              });
            })
            .catch(() => {
              return RetornoErroPadrao();
            });
        })
        .catch(() => {
          return RetornoErroPadrao();
        });
    }

    if (tipo == TipoUsuarioEnum.MENTORADO) {
      const tagsUsuario: UsuarioTags[] = request.body.tags.map(tag => ({
        id_mentorado: id,
        id_tag: tag,
      }));

      await conexao
        .delete()
        .from('usuarios_tags')
        .where({ id_mentorado: id })
        .then(async () => {
          await conexao
            .insert(tagsUsuario)
            .into('usuarios_tags')
            .then(() => {
              return response.json({
                status: 200,
                mensagem: 'Tags atualizadas com sucesso',
              });
            })
            .catch(() => {
              return RetornoErroPadrao();
            });
        })
        .catch(() => {
          return RetornoErroPadrao();
        });
    }
    return RetornoErroPadrao();
  }
}

export default new TagController();
