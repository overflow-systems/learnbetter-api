import { Knex } from "knex";


export async function up(knex: Knex): Promise<void> {
  return knex.schema.createTable('mentor_mentorado', table => {
    table.integer('status', 1).defaultTo(1).notNullable();
    table.date('data_visto');
    
    table.integer('id_mentor').unsigned();
    table.foreign('id_mentor').references('id').inTable('usuarios').onDelete('CASCADE');
    
    table.integer('id_mentorado').unsigned();
    table.foreign('id_mentorado').references('id').inTable('usuarios').onDelete('CASCADE');
  });
}


export async function down(knex: Knex): Promise<void> {
  return knex.schema.dropTable('mentor_mentorado');
}

