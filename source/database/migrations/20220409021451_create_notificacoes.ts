import { Knex } from 'knex';

export async function up(knex: Knex): Promise<void> {
  return knex.schema.createTable('notificacoes', table => {
    table.increments('id').primary();
    table.integer('status', 1).defaultTo(1).notNullable();
    table.string('mensagem').notNullable();
    table.timestamp('data_criacao').defaultTo(knex.fn.now()).notNullable();

    table.integer('id_mentorado').unsigned();
    table.foreign('id_mentorado').references('id').inTable('usuarios').onDelete('CASCADE');

    table.integer('id_mentor').unsigned();
    table.foreign('id_mentor').references('id').inTable('usuarios').onDelete('CASCADE');
  });
}

export async function down(knex: Knex): Promise<void> {
  return knex.schema.dropTable('notificacoes');
}
