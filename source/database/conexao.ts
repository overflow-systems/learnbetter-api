import knex from 'knex';
import path from 'path';

const config = require(path.resolve('knexfile.ts'));

const conexao = knex(config.development);

export default conexao;
