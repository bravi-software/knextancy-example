import env from './env';

export default {
  client: 'pg',
  debug: false,
  connection: {
    multipleStatements: true,
    host: env.db.host,
    user: env.db.user,
    port: env.db.port,
    password: env.db.password,
    database: env.db.database,
  },
  migrations: {
    directory: `${__dirname}/../db/migrations`,
  },
  seeds: {
    directory: `${__dirname}/../db/seeds`,
  },
};
