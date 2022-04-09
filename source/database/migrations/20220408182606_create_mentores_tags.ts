import { Knex } from 'knex';

export async function up(knex: Knex): Promise<void> {
  return knex.schema.createTable('mentores_tags', table => {
    table.integer('id_mentor').unsigned().notNullable();
    table.foreign('id_mentor').references('id').inTable('mentores');

    table.integer('id_tag').unsigned().notNullable();
    table.foreign('id_tag').references('id').inTable('tags');
  });
}

export async function down(knex: Knex): Promise<void> {
  return knex.schema.dropTable('mentores_tags');
}
