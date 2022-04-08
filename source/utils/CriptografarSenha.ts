export default function CriptografarSenha(senha: string): string {
	const bcrypt = require('bcryptjs');

	return bcrypt.hashSync(senha, bcrypt.genSaltSync(10));
}
