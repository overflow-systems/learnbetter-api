import express from 'express';
import conexao from './source/database/conexao';
import Usuario from './source/models/Usuario';
import rotas from './source/rotas';
require('dotenv/config');
const http = require('http');

const app = express();
const server = http.createServer(app);

const io = require('socket.io')(server, {
  cors: {
    origin: '*',
    methods: ['GET', 'POST'],
  },
});

app.use(express.json());

app.use(rotas);

io.on('connection', socket => {
  socket.on('enviarMensagem', async mensagem => {
    const { id_socket } = await conexao
      .select('id_socket')
      .from<Usuario>('usuarios')
      .where('id', mensagem.id_para)
      .first();

    socket.to(id_socket).emit('receberMensagem', mensagem.mensagem);
  });
});

server.listen(process.env.PORT || 3333, () => console.log('Porta 3333'));
