import type { Knex } from 'knex';
import path from 'path';

// Update with your config settings.

const config: { [key: string]: Knex.Config } = {
  development: {
    client: 'mysql',
    connection: {
      host: 'localhost',
      user: 'root',
      password: '123',
      database: 'learnbetter',
      port: 3306,
    },
    migrations: {
      directory: path.resolve(__dirname, 'source', 'database', 'migrations'),
    },
    seeds: {
      directory: path.resolve(__dirname, 'source', 'database', 'seeds'),
    },
    useNullAsDefault: true,
  },
};

module.exports = config;
