import Mentorado from '../models/Mentorado';
import connection from '../database/connection';

class MentoradoController {
	criarMentorado(request, response) {
		const mentorado: Mentorado = {
			nome: request.body.nome,
			sobrenome: request.body.sobrenome,
			data_nascimento: request.body.data_nascimento,
			email: request.body.email,
			celular: request.body.celular,
			senha: request.body.senha,
			genero: request.body.genero,
		};

		const bycript = require('bcryptjs');
		mentorado.senha = bycript.hashSync(mentorado.senha, bycript.genSaltSync(10));

		connection.query('INSERT INTO mentorados SET ?', mentorado, function (error, result, fields) {
			if (error) throw error;

			return response.json(JSON.stringify(result.insertId));
		});
	}

	editarMentorado(request, response) {
		const { id } = request.headers;

		console.log(id);

		const mentorado: Mentorado = {
			nome: request.body.nome,
			sobrenome: request.body.sobrenome,
			data_nascimento: request.body.data_nascimento,
			email: request.body.email,
			celular: request.body.celular,
			genero: request.body.genero,
			data_ultima_atualizacao: new Date(),
		};

		connection.query('UPDATE mentorados SET ? WHERE id = ?', [mentorado, id], function (error, result, fields) {
			if (error) throw error;

			return response.json(JSON.stringify(id));
		});
	}
}

export default new MentoradoController();
