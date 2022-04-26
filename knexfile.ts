require('dotenv/config');
import type { Knex } from 'knex';
import path from 'path';

const config: Knex.Config = {
  client: 'mysql',
  connection: {
    host: 'mysql.overflow.dev.br',
    user: 'overflow02',
    password: 'learnbetter1407',
    database: 'overflow02',
    port: 3306,
  },
  migrations: {
    directory: path.resolve(__dirname, 'source', 'database', 'migrations'),
  },
  seeds: {
    directory: path.resolve(__dirname, 'source', 'database', 'seeds'),
  },
  useNullAsDefault: true,
};

module.exports = config;
