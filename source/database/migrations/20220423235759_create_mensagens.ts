import { Knex } from "knex";


export async function up(knex: Knex): Promise<void> {
  return knex.schema.createTable('mensagens', table => {
    table.text('mensagem').notNullable();
    table.timestamp('data_envio').defaultTo(knex.fn.now()).notNullable();
    table.string('tipo_enviado').notNullable();

    table.integer('id_mentor').unsigned();
    table.foreign('id_mentor').references('id').inTable('usuarios').onDelete('CASCADE');
    
    table.integer('id_mentorado').unsigned();
    table.foreign('id_mentorado').references('id').inTable('usuarios').onDelete('CASCADE');
  });
}


export async function down(knex: Knex): Promise<void> {
  return knex.schema.dropTable('mensagens');
}

