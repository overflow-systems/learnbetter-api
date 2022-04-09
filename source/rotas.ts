import express from 'express';

import MentoriaController from './controller/MentoriaController';
import UsuarioController from './controller/UsuarioController';

const rotas = express.Router();
const swaggerUi = require('swagger-ui-express');
const swaggerDocumento = require('./swagger.json');

rotas.get('/mentorias', MentoriaController.buscarMentorias);
rotas.get('/mentorias/quantidades', MentoriaController.buscarQuantidade);

rotas.get('/usuario/buscar', UsuarioController.buscarUsuario);
rotas.post('/usuario/criar', UsuarioController.criarUsuario);
rotas.put('/usuario/editar', UsuarioController.editarUsuario);
rotas.post('/usuario/login', UsuarioController.login)


rotas.use('/swagger', swaggerUi.serve);
rotas.get('/swagger', swaggerUi.setup(swaggerDocumento));

export default rotas;
