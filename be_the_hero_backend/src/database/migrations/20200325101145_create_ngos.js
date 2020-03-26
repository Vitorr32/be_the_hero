
exports.up = function (knex) {
    return knex.schema.createTable('ngos', table => {
        table.string('id').primary();
        table.string('name').notNullable();
        table.string('email').notNullable();
        table.string('contact').notNullable();
        table.string('city').notNullable();
        table.string('state').notNullable();
        table.string('country').notNullable();
    });
};

exports.down = function (knex) {
    return knex.schema.dropTable('ngos');
};
