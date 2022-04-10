import UsuarioInterface from '../interfaces/UsuarioInterface';

export default function GerarToken(usuario: UsuarioInterface): string {
  const bcrypt = require('bcryptjs');

  return bcrypt.hashSync(usuario.id + usuario.email, bcrypt.genSaltSync(10));
}
