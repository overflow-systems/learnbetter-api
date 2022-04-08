import knex from 'knex';
import path from 'path';

const config = require(path.resolve('knexfile.ts'));

const connection = knex(config.development);

export default connection;
