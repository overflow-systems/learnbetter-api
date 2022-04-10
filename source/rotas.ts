import express from 'express';
import MentoriaController from './controller/MentoriaController';
import NotificacaoController from './controller/NotificacaoController';
import UsuarioController from './controller/UsuarioController';
import AutenticacaoMiddleware from './middleware/AutenticacaoMiddleware';

const rotas = express.Router();
const swaggerUi = require('swagger-ui-express');
const swaggerDocumento = require('./swagger.json');

rotas.post('/usuario/login', UsuarioController.login);
rotas.post('/usuario/criar', UsuarioController.criarUsuario);

rotas.use(AutenticacaoMiddleware);

rotas.get('/usuario/buscar', UsuarioController.buscarUsuario);
rotas.put('/usuario/editar', UsuarioController.editarUsuario);

rotas.get('/notificacao/buscar', NotificacaoController.buscarNotificacoes);

rotas.get('/mentoria/quantidade', MentoriaController.buscarQuantidade);
rotas.get('/mentoria/buscar/usuario', MentoriaController.buscarMentoriaUsuario);
rotas.get('/mentoria/buscar/tags', MentoriaController.buscarMentoriaTags);

rotas.use('/swagger', swaggerUi.serve);
rotas.get('/swagger', swaggerUi.setup(swaggerDocumento));

export default rotas;
