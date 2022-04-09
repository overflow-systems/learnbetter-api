import knex from '../database/connection';
import Mentorado from '../models/Mentorado';
import Mentor from '../models/Mentor';

import VerificarEmailCelular from '../utils/VerificarEmailCelular';
import CriptografarSenha from '../utils/CriptografarSenha';

import VerificarEmailCelularInterface from '../interfaces/VerificarEmailCelularInterface';
import UsuarioInterface from '../interfaces/UsuarioInterface';
import BuscarTabelaTipoUsuario from '../utils/BuscarTabelaTipoUsuario';
import { TipoUsuarioEnum } from '../enum/TipoUsuarioEnum';
import { TabelaUsuarioEnum } from '../enum/TabelaUsuarioEnum';

class MentoradoController {
	async buscarUsuario(request, response) {
		const usuarios = await knex.select('*').from('mentores').unionAll(knex.select('*').from('mentores'));

		return response.json(usuarios);
	}

	async criarUsuario(request, response) {
		const { tipo } = request.headers;

		const erros: VerificarEmailCelularInterface = await VerificarEmailCelular(tipo, request.body.celular, request.body.email);

		if (erros.status == 400) return response.json(erros);

		if (tipo == 'mentorado') {
			return knex.transaction(function (transacao) {
				const mentorado: Mentorado = {
					nome: request.body.nome,
					sobrenome: request.body.sobrenome,
					data_nascimento: request.body.data_nascimento,
					email: request.body.email,
					celular: request.body.celular,
					senha: CriptografarSenha(request.body.senha),
					genero: request.body.genero,
				};

				return transacao
					.insert(mentorado)
					.into('mentorados')
					.then(function (result) {
						return response.json({ status: 200, message: result[0] });
					});
			});
		}

		if (tipo == 'mentor') {
			return knex.transaction(function (transacao) {
				const mentor: Mentor = {
					nome: request.body.nome,
					sobrenome: request.body.sobrenome,
					data_nascimento: request.body.data_nascimento,
					email: request.body.email,
					celular: request.body.celular,
					senha: CriptografarSenha(request.body.senha),
					genero: request.body.genero,
					apresentacao: request.body.apresentacao,
				};

				return transacao
					.insert(mentor)
					.into('mentores')
					.then(function (result) {
						return response.json({ status: 200, message: result[0] });
					});
			});
		}

		return response.json({ status: 400, mensagem: 'Erro inesperado' });
	}

	editarUsuario(request, response) {
		const { id, tipo } = request.headers;

		if (tipo == 'mentorado') {
			return knex.transaction(function (transacao) {
				const mentorado: Mentorado = {
					nome: request.body.nome,
					sobrenome: request.body.sobrenome,
					data_nascimento: request.body.data_nascimento,
					email: request.body.email,
					celular: request.body.celular,
					genero: request.body.genero,
				};

				return transacao
					.update(mentorado)
					.into('mentorados')
					.where('id', id)
					.then(function (result) {
						return response.json({ status: 200, message: result[0] });
					});
			});
		}

		if (tipo == 'mentor') {
			return knex.transaction(function (transacao) {
				const mentor: Mentor = {
					nome: request.body.nome,
					sobrenome: request.body.sobrenome,
					data_nascimento: request.body.data_nascimento,
					email: request.body.email,
					celular: request.body.celular,
					genero: request.body.genero,
					apresentacao: request.body.apresentacao,
				};

				return transacao
					.update(mentor)
					.into('mentores')
					.where('id', id)
					.then(function (result) {
						return response.json({ status: 200, message: result[0] });
					});
			});
		}

		return response.json({ status: 400, mensagem: 'Erro inesperado' });
	}

	async login(request, response) {
		const { tipo } = request.headers;

		const usuario: UsuarioInterface = {
			email: request.body.email,
			senha: request.body.senha,
		};

		const tabela: TabelaUsuarioEnum = BuscarTabelaTipoUsuario(tipo);

		const { senha } = await knex.select('senha').from(tabela).where('email', usuario.email).first();

		const bcrypt = require('bcryptjs');

		if (bcrypt.compareSync(usuario.senha, senha)) return response.json({ status: 200, mensagem: 'OK' });
		else return response.json({ status: 401, mensagem: 'Erro ao fazer login' });
	}
}

export default new MentoradoController();
