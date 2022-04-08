import { Knex } from 'knex';

export async function up(knex: Knex): Promise<void> {
	return knex.schema.createTable('mentorias_tags', table => {
		table.integer('id_mentoria').unsigned().notNullable();
		table.foreign('id_mentoria').references('id').inTable('mentorias');

		table.integer('id_tag').unsigned().notNullable();
		table.foreign('id_tag').references('id').inTable('tags');
	});
}

export async function down(knex: Knex): Promise<void> {
	return knex.schema.dropTable('mentorias_tags');
}
