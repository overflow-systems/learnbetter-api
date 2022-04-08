import express from 'express';

import MentoriaController from './controller/MentoriaController';
import UsuarioController from './controller/UsuarioController';

const routes = express.Router();

routes.get('/mentorias', MentoriaController.buscarMentorias);
routes.get('/mentorias/quantidades', MentoriaController.buscarQuantidade);

routes.get('/usuario/buscar', UsuarioController.buscarUsuario);
routes.post('/usuario/criar', UsuarioController.criarUsuario);
routes.put('/usuario/editar', UsuarioController.editarUsuario);

export default routes;
