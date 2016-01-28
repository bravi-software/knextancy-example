import express from 'express';
import knex from 'knex';
import knextancy from 'knextancy';
import bodyParser from 'body-parser';


import api from './api';


export async function application (config) {
  const app = express();

  app.set('config', config);
  app.use(bodyParser.json());
  app.use(knextancy.middleware(knex(config.knex)));

  api(app);

  return app;
}


export async function start (config) {
  const app = await application(config);
  app.listen(config.env.http.port, config.env.http.host, () => {
    /* eslint no-console:0 */
    console.info('Server started at [ http://%s:%s ]', config.env.http.host, config.env.http.port);
  });
}
