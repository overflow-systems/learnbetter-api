import express from 'express';
import MentoriaController from './controller/MentoriaController';
import NotificacaoController from './controller/NotificacaoController';
import UsuarioController from './controller/UsuarioController';
import ChatController from './controller/ChatController';
import AutenticacaoMiddleware from './middleware/AutenticacaoMiddleware';

const rotas = express.Router();

rotas.post('/usuario/login', UsuarioController.login);
rotas.post('/usuario/criar', UsuarioController.criarUsuario);

rotas.use(AutenticacaoMiddleware);

rotas.get('/usuario/buscar', UsuarioController.buscarUsuario);
rotas.put('/usuario/editar', UsuarioController.editarUsuario);
rotas.delete('/usuario/deletar', UsuarioController.deletarUsuario);
rotas.put('/usuario/alterar-tipo-conta', UsuarioController.alterarTipoConta);

rotas.get('/notificacao/buscar', NotificacaoController.buscarNotificacoes);
rotas.put('/notificacao/ler', NotificacaoController.lerNotificacao);
rotas.put('/notificacao/desativar', NotificacaoController.desativarNotificacao);

rotas.get('/mentoria/quantidade', MentoriaController.buscarQuantidade);
rotas.get('/mentoria/buscar/usuario', MentoriaController.buscarMentoriaUsuario); //usuario logado
rotas.get('/mentoria/mostrar', MentoriaController.mostrarMentoria);
rotas.post('/mentoria/proposta/enviar', MentoriaController.enviarProposta);
rotas.put('/mentoria/proposta/responder', MentoriaController.responderProposta);
rotas.put('/mentoria/avaliar', MentoriaController.avaliarMentoria);
rotas.get('/mentoria/mentores', MentoriaController.buscarMentores);

rotas.get('/chat/buscar', ChatController.buscarChat);
rotas.post('/chat/mensagem/enviar', ChatController.enviarMensagem);
rotas.get('/chat/listar', ChatController.listarChats);

export default rotas;
