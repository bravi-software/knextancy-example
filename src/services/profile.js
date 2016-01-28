import Valida from 'valida';
import { NotFoundError, BadRequestError } from 'meaning-error';


export async function list (knex) {
  return knex('$_profile')
    .where({ deleted: false })
    .select();
}


export async function detail (knex, id) {
  const safeId = parseInt(id, 10);

  if (isNaN(safeId)) {
    throw new NotFoundError('Could not find profile!');
  }

  const profile = await knex('$_profile')
    .where({ id: safeId, deleted: false })
    .select()
    .first();

  if (!profile) {
    throw new NotFoundError('Could not find profile!');
  }

  return profile;
}


export async function create (knex, data) {
  const entity = {
    name: data.name,
    createdAt: new Date(),
    updatedAt: new Date(),
  };

  await validate(knex, 'create', entity);

  const [id] = await knex('$_profile')
    .insert(entity)
    .returning('id');

  const profile = await detail(knex, id);

  return profile;
}


export async function update (knex, data) {
  if (!data || !data.id) {
    throw new NotFoundError('Could not find profile');
  }

  const safeId = parseInt(data.id, 10);

  if (isNaN(safeId)) {
    throw new NotFoundError('Could not find profile');
  }

  const entity = {
    id: safeId,
    name: data.name,
  };

  await validate(knex, 'update', entity);

  const result = await knex('$_profile')
    .update(entity)
    .where({ id: entity.id, deleted: false });

  if (result === 0) {
    throw new NotFoundError('Profile not found');
  }

  const profile = await detail(knex, entity.id);

  return profile;
}


export async function remove (knex, id) {
  const safeId = parseInt(id, 10);

  if (isNaN(safeId)) {
    throw new NotFoundError('Could not find profile');
  }

  const result = await knex('$_profile')
    .where({ id, deleted: false })
    .update({ deleted: true });

  if (result === 0) {
    throw new NotFoundError('Could not find profile');
  }

  return true;
}


async function validate (knex, operation, data) {
  const schema = {
    name: [
      { validator: Valida.Validator.required },
    ],
  };

  const result = await Valida.process(data, schema);

  if (!result.isValid()) {
    throw new BadRequestError('Your data is not valid', result.invalidError().validationErrors);
  }
}
