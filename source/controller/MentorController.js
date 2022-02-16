class MentorController {
	index(request, response) {
		return response.json({ mensagem: 'Sucesso' });
	}
}

module.exports = new MentorController();
