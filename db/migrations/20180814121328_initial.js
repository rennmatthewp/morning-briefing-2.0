
exports.up = function(knex, Promise) {
  return Promise.all([
    knex.schema.createTable('users', table => {
      table.increments('id').primary();
      table.string('email').unique();
      table.string('firstName');
      table.string('lastName');
      table.timestamps(true, true);
    }),
    knex.schema.createTable('locations', table => {
      table.increments('id').primary();
      table.integer('user_id').unsigned();
      table.foreign('user_id').references('users.id');
      table.string('city');
      table.string('state');
      table.string('zipcode');
      table.string('weatherStation');
      table.timestamps(true, true);
    }),
    knex.schema.createTable('saved_stories', table => {
      table.increments('id').primary();
      table.integer('user_id').unsigned();
      table.foreign('user_id').references('users.id');
      table.string('title');
      table.string('abstract');
      table.string('byline');
      table.string('thumbnail');
      table.string('url');
      table.string('caption');
      table.timestamps(true, true);
    })
  ])
};

exports.down = function(knex, Promise) {
  return Promise.all([
    knex.schema.dropTable('saved_stories'),
    knex.schema.dropTable('locations'),
    knex.schema.dropTable('users')
  ])
};
