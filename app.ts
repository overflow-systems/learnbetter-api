import express from 'express';
import conexao from './source/database/conexao';
import Usuario from './source/models/Usuario';
import rotas from './source/rotas';
require('dotenv/config');
const http = require('http');
const cors = require('cors');

import Mensagem from './source/models/Mensagem';
import { TipoUsuarioEnum } from './source/enum/TipoUsuarioEnum';

const app = express();

app.use(cors());

const server = http.createServer(app);

const io = require('socket.io')(server, {
  cors: {
    origin: '*',
    methods: ['GET', 'POST'],
  },
});

app.use(express.json());

app.use(rotas);

io.on('connection', async socket => {
  console.log(socket.id);
  
  // await conexao
  //   .update({ id_socket: socket.id })
  //   .into('usuarios')
  //   .where({ id });

  socket.on('enviarMensagem', async data => {
    const { id_socket } = await conexao
      .select('id_socket')
      .from<Usuario>('usuarios')
      .where('id', 2)
      .first();

    const mensagem: Mensagem = {
      mensagem: data.mensagem,
      tipo_enviado: data.tipo,
      id_mentor: data.tipo == TipoUsuarioEnum.MENTOR ? data.id_de : data.id_para,
      id_mentorado: data.tipo == TipoUsuarioEnum.MENTORADO ? data.id_de : data.id_para,
    };

    await conexao.insert(mensagem).into('mensagens');

    socket.to(id_socket).emit('receberMensagem', data.mensagem);
  });
});

server.listen(process.env.PORT || 3333, () => console.log('Porta 3333'));
