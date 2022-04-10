import knex from '../database/connection';
import Usuario from '../models/Usuario';
import { Request, Response } from 'express';
import CriptografarSenha from '../utils/CriptografarSenha';
import StatusMensagemInterface from '../interfaces/StatusMensagemInterface';
import UsuarioInterface from '../interfaces/UsuarioInterface';
import { TabelaUsuarioEnum } from '../enum/TabelaUsuarioEnum';
import RetornoErroPadrao from '../utils/RetornoErroPadrao';
import ValidarRequestCriarUsuario from '../utils/ValidarRequestCriarUsuario';
import { kStringMaxLength } from 'buffer';
import { TipoUsuarioEnum } from '../enum/TipoUsuarioEnum';
import CompararSenha from '../utils/CompararSenha';
import GerarToken from '../utils/GerarToken';

class UsuarioController {
  async buscarUsuario(request: Request, response: Response) {
    await knex
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

    knex('usuarios')
      .insert(usuario)
      .then(result => {
        return response.json({ status: 200, message: result });
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

    await knex
      .update(usuario)
      .into('usuarios')
      .where('id', id)
      .then(result => {
        return response.json({ status: 200, message: result });
      });

    return RetornoErroPadrao();
  }

  async login(request: Request, response: Response) {
    const { tipo } = request.headers;

    const usuario: UsuarioInterface = {
      email: request.body.email,
      senha: request.body.senha,
      tipoUsuario:
        tipo == 'mentor' ? TipoUsuarioEnum.MENTOR : TipoUsuarioEnum.MENTORADO,
    };

    await knex
      .select('id', 'senha')
      .from<Usuario>('usuarios')
      .where('email', usuario.email)
      .first()
      .then(async (resultado: UsuarioInterface) => {
        usuario.id = resultado.id;

        if (CompararSenha(resultado.senha, usuario.senha)) {
          const token = GerarToken(usuario);

          await knex
            .update({ token: token })
            .into('usuarios')
            .where({ id: usuario.id, email: usuario.email })
            .then(() => {
              return response.json({ status: 200, mensagem: token });
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
