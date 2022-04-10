import express from 'express';

import MentoriaController from './controller/MentoriaController';
import NotificacaoControler from './controller/NotificacaoControler';
import UsuarioController from './controller/UsuarioController';

const rotas = express.Router();
const swaggerUi = require('swagger-ui-express');
const swaggerDocumento = require('./swagger.json');

rotas.get('/usuario/buscar', UsuarioController.buscarUsuario);
rotas.post('/usuario/criar', UsuarioController.criarUsuario);
rotas.put('/usuario/editar', UsuarioController.editarUsuario);
rotas.post('/usuario/login', UsuarioController.login);

rotas.get('/notificacao/buscar', NotificacaoControler.buscarNotificacoes);

rotas.get('/mentoria/quantidade', MentoriaController.buscarQuantidade);
rotas.get('/mentoria/buscar/usuario', MentoriaController.buscarMentoriaUsuario);
rotas.get('/mentoria/buscar/tags', MentoriaController.buscarMentoriaTags);

rotas.use('/swagger', swaggerUi.serve);
rotas.get('/swagger', swaggerUi.setup(swaggerDocumento));

export default rotas;
