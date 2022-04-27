import express from 'express';
import rotas from './source/rotas';
require('dotenv/config');

const app = express();

app.use(express.json());

app.use(rotas);

app.listen(process.env.PORT || 3333, () => console.log('Porta 3333'));
