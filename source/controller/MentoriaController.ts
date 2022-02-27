import { StatusMentoriaEnum } from '../utils/StatusMentoriaEnum';

import connection from '../database/connection';

class MentoriaController {
	buscarQuantidade(request, response) {
		const { status } = request.query;

		const statusUpper = status ? status.toUpperCase() : StatusMentoriaEnum.ANDAMENTO;

		const enumValue = StatusMentoriaEnum[statusUpper];

		const query = `SELECT count(mentorias.id) quantidade
									 FROM mentorias
									 INNER JOIN mentorados ON mentorados.id = mentorias.id_mentorado
									 WHERE status = ${enumValue}`;

		connection.query(query, function (error, results, fields) {
			if (error) throw error;

			return response.json(JSON.stringify(results.quantidade ?? 0));
		});
	}

	buscarMentorias(request, response) {
		const { status } = request.query;

		const enumValue = status ? StatusMentoriaEnum[status.toUpperCase()] : StatusMentoriaEnum.ANDAMENTO;

		const query = `SELECT mentores.nome, mentores.sobrenome, mentorias.data_inicio
									 FROM mentorias
									 INNER JOIN mentorados ON mentorados.id = mentorias.id_mentorado
									 INNER JOIN mentores ON mentores.id = mentorias.id_mentor
									 WHERE status = ${enumValue}`;

		const tagsQuery = `SELECT tags.nome
											 FROM tags
											 INNER JOIN mentorias_tags on mentorias_tags.id_mentoria = tags.id
											 INNER JOIN mentorias ON mentorias.id = mentorias_tags.id_mentoria`;

		connection.query(query, function (error, results, fields) {
			if (error) throw error;

			results.tags = connection.query(tagsQuery);

			return response.json(JSON.stringify(results));
		});
	}
}

export default new MentoriaController();
