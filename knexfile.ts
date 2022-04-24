import type { Knex } from 'knex';
import path from 'path';

// Update with your config settings.

const config: Knex.Config = {
  client: process.env.DB_CLIENT || 'mysql',
  connection: {
    host: process.env.DB_HOST || 'localhost',
    user: process.env.DB_USER || 'root',
    password: process.env.DB_PASSWORD || '123',
    database: process.env.DB_DATABASE || 'learnbetter',
    port: Number(process.env.DB_PORT) || 3306,
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
