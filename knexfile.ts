import { resolve } from 'path';


module.exports = {
  client: 'pg',
  connection: {
    host: 'localhost',
    port: 5432,
    user: 'postgres',
    password: 'docker',
    database: 'nlw-proffy'
  },
  migrations: {
    directory: resolve(__dirname, 'src', 'database', 'migrations')
  }
}