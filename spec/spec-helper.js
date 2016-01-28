import fs from 'fs';
import knex from 'knex';
import knextancy from 'knextancy';
import config from '../config';

const truncateTablesSQL = fs.readFileSync(`${__dirname}/spec-helper.sql`, { encoding: 'utf8' });

const connection = knex(config.knex);

if (config.env.environment !== 'test') {
  throw new Error('TEST RUNNER DELETES THE DATABASE!. Run it with NODE_ENV=test');
}

beforeEach(function () {
  return truncateAllTables()
    .then(() => knextancy.tenant(connection, 1))
    .then(tenantKnex => this.connection = tenantKnex);
});


function truncateAllTables () {
  return connection
    .raw(truncateTablesSQL)
    .then(sqlQuery => {
      const query = sqlQuery.rows.map(sql => sql.trucate_table_cmd).join('');
      return connection.raw(query);
    });
}
