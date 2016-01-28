import errorMeaning from 'meaning-error-middleware';
import * as profile from './profile';


const wrap = fn => (...args) => fn(...args).catch(args[2]);


export default (app) => {
  app.get('/', wrap(profile.list));
  app.get('/:id', wrap(profile.detail));
  app.post('/', wrap(profile.create));
  app.put('/:id', wrap(profile.update));
  app.delete('/:id', wrap(profile.remove));

  app.get('/_ping', (req, res) => res.sendStatus(200));

  app.get('*', function (req, res) {
    res.sendStatus(404);
  });

  app.use(errorMeaning);

  /* eslint "no-unused-vars":0 */
  app.use(function (err, req, res, next) {
    if (err === 'Missing x-client-id header') {
      res.status(400).send(err);
      return;
    }

    res.status(500).send(err);
  });
};
