import BaseSchema from '@ioc:Adonis/Lucid/Schema'

export default class UsersSchema extends BaseSchema {
  protected tableName = 'users'

  public async up () {
    this.schema.createTable(this.tableName, (table) => {
      table.increments('id').primary()
      table.string('name',150).notNullable()
      table.string('lastname',150).notNullable()
      table.integer('perfil').notNullable()
      table.string('tipo_id').notNullable
      table.string('num_documento_usuario',20).notNullable()
      table.string('direccion',150).notNullable
      table.string('barrio',150).notNullable
      table.string('municipio',200).notNullable
      table.string('departamento',200).notNullable
      table.string('email', 255).notNullable()
      table.string('password', 180).notNullable()
      table.string('remember_me_token').nullable()
      table.timestamps(true)
    })
  }

  public async down () {
    this.schema.dropTable(this.tableName)
  }
}
