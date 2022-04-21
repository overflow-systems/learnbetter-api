import conexao from '../database/conexao';
import Usuario from '../models/Usuario';
import { Request, Response } from 'express';
import CriptografarSenha from '../utils/CriptografarSenha';
import StatusMensagemInterface from '../interfaces/StatusMensagemInterface';
import UsuarioInterface from '../interfaces/UsuarioInterface';
import RetornoErroPadrao from '../utils/RetornoErroPadrao';
import ValidarRequestCriarUsuario from '../utils/ValidarRequestCriarUsuario';
import { TipoUsuarioEnum } from '../enum/TipoUsuarioEnum';
import CompararSenha from '../utils/CompararSenha';
import GerarToken from '../utils/GerarToken';
import ValidarTipoUsuario from '../utils/ValidarTIpoUsuario';
import UsuarioTags from '../models/UsuarioTags';
import { StatusMentoriaEnum } from '../enum/StatusMentoriaEnum';

class UsuarioController {
  async buscarUsuario(request: Request, response: Response) {
    await conexao
      .select('*')
      .from<Usuario>('usuarios')
      .then(usuarios => {
        return response.json(usuarios);
      });

    return RetornoErroPadrao();
  }

  async criarUsuario(request: Request, response: Response) {
    const erros: StatusMensagemInterface = await ValidarRequestCriarUsuario(
      request.body.celular,
      request.body.email,
      request.body.mentor,
      request.body.mentorado
    );

    if (erros.status == 400) return response.json(erros);

    const usuario: Usuario = {
      nome: request.body.nome,
      sobrenome: request.body.sobrenome,
      data_nascimento: request.body.data_nascimento,
      email: request.body.email,
      celular: request.body.celular,
      senha: CriptografarSenha(request.body.senha),
      genero: request.body.genero,
      apresentacao: request.body.apresentacao ?? null,
      mentor: request.body.mentor ?? false,
      mentorado: request.body.mentorado ?? false,
    };

    conexao
      .insert(usuario)
      .into('usuarios')
      .then(idUsuario => {
        const tagsUsuario: UsuarioTags = request.body.tags.map(tag => ({
          id_mentor: request.body.mentor ? idUsuario : null,
          id_mentorado: request.body.mentorado ? idUsuario : null,
          id_tag: tag,
        }));

        conexao
          .insert(tagsUsuario)
          .into('usuarios_tags')
          .then(result => console.log(result))
          .catch(err => console.error(err));

        return response.json({ status: 200, message: idUsuario });
      });

    return RetornoErroPadrao();
  }

  async editarUsuario(request: Request, response: Response) {
    const { id } = request.headers;

    const usuario: Usuario = {
      nome: request.body.nome,
      sobrenome: request.body.sobrenome,
      data_nascimento: request.body.data_nascimento,
      email: request.body.email,
      celular: request.body.celular,
      genero: request.body.genero,
      apresentacao: request.body.apresentacao,
      data_ultima_atualizacao: new Date(Date.now()),
      mentor: request.body.mentor,
      mentorado: request.body.mentorado,
    };

    await conexao
      .update(usuario)
      .into('usuarios')
      .where('id', id)
      .then(result => {
        return response.json({ status: 200, message: result });
      });

    return RetornoErroPadrao();
  }

  async deletarUsuario(request: Request, response: Response) {
    const { id } = request.headers;

    await conexao
      .delete()
      .from('usuarios')
      .where('id', id)
      .then(() => {
        return response.json({
          status: 200,
          message: 'Usuário deletado com sucesso',
        });
      });

    return RetornoErroPadrao();
  }

  async login(request: Request, response: Response) {
    const usuario: UsuarioInterface = {
      email: request.body.email,
      senha: request.body.senha,
    };

    await conexao
      .select('id', 'senha', 'mentorado', 'mentor')
      .from<Usuario>('usuarios')
      .where('email', usuario.email)
      .then(async resultados => {
        resultados.forEach(resultado => {
          if (resultado.mentor) usuario.mentor = resultado.mentor;
          if (resultado.mentorado) usuario.mentorado = resultado.mentorado;
        });

        usuario.id = resultados[0].id;

        if (CompararSenha(resultados[0].senha, usuario.senha)) {
          const token = GerarToken(usuario);

          await conexao
            .update({ token: token })
            .into('usuarios')
            .where({ id: usuario.id, email: usuario.email })
            .then(() => {
              return response.json({
                status: 200,
                token: token,
                id: usuario.id,
                mentorado: usuario.mentorado,
                mentor: usuario.mentor,
              });
            });
        } else
          return response.json({
            status: 401,
            mensagem: 'Erro ao fazer login',
          });
      });

    return RetornoErroPadrao();
  }
}

export default new UsuarioController();
