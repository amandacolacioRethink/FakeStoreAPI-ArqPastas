import { Knex } from "knex";


export async function up(knex: Knex): Promise<void> {
    await knex.schema.createTable('users', function (table) {
        table.increments()
        table.string('user').notNullable()
        table.string('senha').notNullable
    })
}


export async function down(knex: Knex): Promise<void> {
    await knex.schema.dropTable('users')
}

