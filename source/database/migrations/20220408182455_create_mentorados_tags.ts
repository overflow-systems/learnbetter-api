import { Knex } from 'knex';

export async function up(knex: Knex): Promise<void> {
  return knex.schema.createTable('mentorados_tags', table => {
    table.integer('id_mentorado').unsigned().notNullable();
    table.foreign('id_mentorado').references('id').inTable('mentorados');

    table.integer('id_tag').unsigned().notNullable();
    table.foreign('id_tag').references('id').inTable('tags');
  });
}

export async function down(knex: Knex): Promise<void> {
  return knex.schema.dropTable('mentorados_tags');
}
