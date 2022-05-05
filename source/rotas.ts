import express from 'express';
import MentoriaController from './controller/MentoriaController';
import NotificacaoController from './controller/NotificacaoController';
import UsuarioController from './controller/UsuarioController';
import ChatController from './controller/ChatController';
import TagController from './controller/TagController';
import AutenticacaoMiddleware from './middleware/AutenticacaoMiddleware';
import BodyParser from 'body-parser';
import { errors } from 'celebrate';
import {
  LoginValidation,
  CriarUsuarioValidation,
  BuscarUsuariosValidation,
  EditarUsuarioValidation,
  DeletarUsuarioValidation,
  AlterarTipoContaValidation,
  BuscarNotificacoesValidation,
  LerNotificacaoValidation,
  DesativarNotificacaoValidation,
  BuscarQuantidadeValidation,
  BuscarMentoriaValidation,
  MostrarMentoriaValidation,
  EnviarPropostaValidation,
  ResponderPropostaValidation,
  AvaliarMentoriaValidation,
  BuscarMentoresValidation,
  BuscarChatValidation,
  EnviarMensagemValidation,
  ListarChatsValidation,
  EditarTagsValidation,
  AlterarSenhaValidation,
  EsqueciMinhaSenhaValidation,
  ValidarCredenciaisValidation,
} from './validations/Validations';

const rotas = express();
rotas.use(BodyParser.json());

rotas.post('/usuario/login', LoginValidation, UsuarioController.login);
rotas.post('/usuario/criar', CriarUsuarioValidation, UsuarioController.criarUsuario);
rotas.put('/usuario/esqueci-minha-senha', EsqueciMinhaSenhaValidation, UsuarioController.esqueciMinhaSenha);
rotas.get('/tag/listar', TagController.listarTags);
rotas.get('/usuario/validar-credenciais', ValidarCredenciaisValidation, UsuarioController.validarCredenciais);

// rotas.use(AutenticacaoMiddleware);

rotas.get('/usuario/buscar', BuscarUsuariosValidation, UsuarioController.buscarUsuarios);
rotas.put('/usuario/editar', EditarUsuarioValidation, UsuarioController.editarUsuario);
rotas.delete('/usuario/deletar', DeletarUsuarioValidation, UsuarioController.deletarUsuario);
rotas.put('/usuario/alterar-tipo-conta', AlterarTipoContaValidation, UsuarioController.alterarTipoConta);
rotas.put('/usuario/alterar-senha', AlterarSenhaValidation, UsuarioController.alterarSenha);

rotas.get('/notificacao/buscar', BuscarNotificacoesValidation, NotificacaoController.buscarNotificacoes);
rotas.put('/notificacao/ler', LerNotificacaoValidation, NotificacaoController.lerNotificacao);
rotas.put('/notificacao/desativar', DesativarNotificacaoValidation, NotificacaoController.desativarNotificacao);

rotas.get('/mentoria/quantidade', BuscarQuantidadeValidation, MentoriaController.buscarQuantidade);
rotas.get('/mentoria/buscar/usuario', BuscarMentoriaValidation, MentoriaController.buscarMentoriaUsuario); //usuario logado
rotas.get('/mentoria/mostrar', MostrarMentoriaValidation, MentoriaController.mostrarMentoria);
rotas.post('/mentoria/proposta/enviar', EnviarPropostaValidation, MentoriaController.enviarProposta);
rotas.put('/mentoria/proposta/responder', ResponderPropostaValidation, MentoriaController.responderProposta);
rotas.put('/mentoria/avaliar', AvaliarMentoriaValidation, MentoriaController.avaliarMentoria);
rotas.get('/mentoria/mentores', BuscarMentoresValidation, MentoriaController.buscarMentores);

rotas.get('/chat/buscar', BuscarChatValidation, ChatController.buscarChat);
rotas.post('/chat/mensagem/enviar', EnviarMensagemValidation, ChatController.enviarMensagem);
rotas.get('/chat/listar', ListarChatsValidation, ChatController.listarChats);

rotas.put('/tag/editar', EditarTagsValidation, TagController.editarTags);

rotas.use(errors());

export default rotas;
