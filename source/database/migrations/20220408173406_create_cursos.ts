import { Knex } from 'knex';

export async function up(knex: Knex): Promise<void> {
  return knex.schema.createTable('cursos', table => {
    table.increments('id').primary();
    table.string('nome').notNullable();
    table.string('instituicao').notNullable;
    table.date('data_inicio');
    table.date('data_fim');
    table.string('certificado');
    table.string('tipo_curso').notNullable();

    table.integer('id_mentor').unsigned().notNullable();
    table.foreign('id_mentor').references('id').inTable('usuarios').onDelete('CASCADE');
  });
}

export async function down(knex: Knex): Promise<void> {
  return knex.schema.dropTable('cursos');
}
