export default function CompararSenha(senha: string, hash: string): boolean {
  const bcrypt = require('bcryptjs');

  return bcrypt.compareSync(hash, senha);
}
