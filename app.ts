import express from 'express';
import dotenv from 'dotenv';
dotenv.config();
import routes from './source/routes';

const app = express();

app.use(express.json());

app.use(routes);

app.listen(3333, () => console.log('Porta 3333'));
