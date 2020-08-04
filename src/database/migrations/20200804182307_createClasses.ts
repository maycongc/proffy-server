import * as Knex from "knex";

export async function up(knex: Knex): Promise<void> {
  return await knex.schema.createTable('classes', table => {
    table.uuid('id').primary().defaultTo(knex.raw('uuid_generate_v4()'));
    table.string('subject').notNullable();
    table.string('cost').notNullable();

    table.uuid('user_id')
      .notNullable()
      .references('id')
      .inTable('users')
      .onDelete('CASCADE')
      .onUpdate('CASCADE');
  });
}

export async function down(knex: Knex): Promise<void> {
  return await knex.schema.dropTableIfExists('classes');
}

