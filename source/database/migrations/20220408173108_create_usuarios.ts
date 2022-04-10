import { Knex } from 'knex';

export async function up(knex: Knex): Promise<void> {
  return knex.schema.createTable('usuarios', table => {
    table.increments('id').primary();
    table.string('token');
    table.string('nome').notNullable();
    table.string('sobrenome').notNullable();
    table.date('data_nascimento').notNullable();
    table.string('email').unique().notNullable();
    table.string('celular', 11).unique().notNullable();
    table.string('senha').notNullable();
    table.text('apresentacao');
    table.integer('genero', 1).defaultTo(3).notNullable();
    table.timestamp('data_criacao').defaultTo(knex.fn.now()).notNullable();
    table.timestamp('data_ultima_atualizacao');

    table.boolean('mentor').defaultTo(false).notNullable();
    table.boolean('mentorado').defaultTo(false).notNullable();
  });
}

export async function down(knex: Knex): Promise<void> {
  return knex.schema.dropTable('usuarios');
}
