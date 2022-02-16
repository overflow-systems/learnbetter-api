const express = require('express');
const routes = require('./source/routes');

const app = express();

app.use(routes);

app.listen(3333, () => console.log('Porta 3333'));
