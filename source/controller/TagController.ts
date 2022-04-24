import conexao from '../database/conexao';
import { Request, Response } from 'express';
import RetornoErroPadrao from '../utils/RetornoErroPadrao';
import { TipoUsuarioEnum } from '../enum/TipoUsuarioEnum';
import Tag from '../models/Tag';

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
}

export default new TagController();
