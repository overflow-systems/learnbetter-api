import { Knex } from 'knex';

export async function up(knex: Knex): Promise<void> {
  return knex.schema.createTable('usuarios_tags', table => {
    table.integer('id_mentorado').unsigned();
    table.foreign('id_mentorado').references('id').inTable('usuarios').onDelete('CASCADE');

    table.integer('id_mentor').unsigned();
    table.foreign('id_mentor').references('id').inTable('usuarios').onDelete('CASCADE');

    table.integer('id_tag').unsigned().notNullable();
    table.foreign('id_tag').references('id').inTable('tags').onDelete('CASCADE');
  });
}

export async function down(knex: Knex): Promise<void> {
  return knex.schema.dropTable('usuarios_tags');
}
