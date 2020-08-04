import * as Knex from "knex";

export async function up(knex: Knex): Promise<void> {
  return await knex.schema.createTable('connections', table => {
    table.increments('id').primary();
    table.timestamp('created_at').defaultTo(knex.fn.now()).notNullable()
    table.uuid('user_id')
      .notNullable()
      .references('id')
      .inTable('users')
      .onDelete('CASCADE')
      .onUpdate('CASCADE');
  });
}

export async function down(knex: Knex): Promise<void> {
  return await knex.schema.dropTableIfExists('connections');
}

