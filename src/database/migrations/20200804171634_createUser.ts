import * as Knex from 'knex';

export async function up(knex: Knex): Promise<void> {
  knex.schema.raw('CREATE EXTENSION IF NOT EXISTS "uuid-ossp"');

  return knex.schema.createTable('users', table => {
    table.uuid('id').primary().defaultTo(knex.raw('uuid_generate_v4()'));
    table.string('name').notNullable();
    table.string('avatar').notNullable();
    table.string('whatsapp').notNullable();
    table.string('bio').notNullable();
  });
}

export async function down(knex: Knex): Promise<void> {
  knex.schema.dropTableIfExists('users');

  return knex.schema.raw('DROP EXTENSION IF EXISTS "uuid-ossp"');
}
