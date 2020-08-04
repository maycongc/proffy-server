import knex from 'knex';

const db = knex({
  client: 'pg',
  connection: {
    host: 'localhost',
    port: 5432,
    user: 'postgres',
    password: 'docker',
    database: 'nlw-proffy'
  }
});

export default db;
