import express from 'express';
import rotas from './source/rotas';


const app = express();

app.use(express.json());

app.use(rotas);

app.listen(3333, () => console.log('Porta 3333'));
