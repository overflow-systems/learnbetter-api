import express from 'express';

import MentoriaController from './controller/MentoriaController';
import MentoradoController from './controller/MentoradoController';

const routes = express.Router();

routes.get('/mentorias/quantidades', MentoriaController.buscarQuantidade);
routes.get('/mentorias', MentoriaController.buscarMentorias);

routes.post('/mentorado/criar', MentoradoController.criarMentorado);

export default routes;
