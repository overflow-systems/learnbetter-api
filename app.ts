import express from 'express';
import routes from './source/routes';

import path from 'path';

console.log(__dirname);

const app = express();

app.use(express.json());

app.use(routes);

app.listen(3333, () => console.log('Porta 3333'));
