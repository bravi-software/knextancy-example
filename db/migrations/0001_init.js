export function up (knex) {
  return knex.schema.createTable('$_profile', (table) => {
    table.increments('id').primary();
    table.string('name');
    table.datetime('createdAt');
    table.datetime('updatedAt');
    table.boolean('deleted').defaultTo(false);
  });
}


export function down (knex) {
  return knex.schema.dropTable('$_profile');
}
