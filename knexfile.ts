require('dotenv/config');
import type { Knex } from 'knex';
import path from 'path';

const config: Knex.Config = {
  client: process.env.DB_CLIENT,
  connection: {
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_DATABASE,
    port: Number(process.env.DB_PORT),
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
