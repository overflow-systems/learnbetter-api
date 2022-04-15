import { Knex } from 'knex';

export async function up(knex: Knex): Promise<void> {
  return knex.schema.createTable('mentorias', table => {
    table.increments('id').primary();
    table.integer('avaliacao_mentorado').notNullable();
    table.integer('avaliacao_mentor').notNullable;
    table.timestamp('data_inicio');
    table.timestamp('data_fim');
    table.integer('status', 1).defaultTo(1).notNullable();

    table.integer('id_mentor').unsigned();
    table.foreign('id_mentor').references('id').inTable('usuarios').onDelete('CASCADE');

    table.integer('id_mentorado').unsigned();
    table.foreign('id_mentorado').references('id').inTable('usuarios').onDelete('CASCADE');
  });
}

export async function down(knex: Knex): Promise<void> {
  return knex.schema.dropTable('mentorias');
}
