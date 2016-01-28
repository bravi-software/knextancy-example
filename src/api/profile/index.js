import * as profile from '../../services/profile';
import presenter from '../../presenter/profile';


export async function list (req, res) {
  res.status(200)
    .send(
      presenter(
        await profile.list(req.knex),
        req.originalUrl
      )
    );
}


export async function detail (req, res) {
  res.status(200)
    .send(
      presenter(
        await profile.detail(req.knex, req.params.id),
        req.originalUrl
      )
    );
}


export async function create (req, res) {
  res.status(201)
    .send(
      presenter(
        await profile.create(
          req.knex,
          req.body,
        )
      )
    );
}


export async function update (req, res) {
  const data = {
    ...req.body,
    id: req.params.id,
  };

  res.status(200)
    .send(
      presenter(
        await profile.update(
          req.knex,
          data,
        )
      )
    );
}


export async function remove (req, res) {
  await profile.remove(
    req.knex,
    req.params.id,
  );

  res.sendStatus(200);
}
