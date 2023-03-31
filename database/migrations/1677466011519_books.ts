import BaseSchema from '@ioc:Adonis/Lucid/Schema'

export default class Books extends BaseSchema {
  protected tableName = 'books'

  public async up () {
    this.schema.createTable(this.tableName, (table) => {
      table.increments('id')
      table.string('titulo',150).notNullable()
      table.string('autor',200).notNullable()
      table.string('editorial',50).notNullable()
      table.string('formato',50).notNullable()
      table.integer('paginas').notNullable()
      table.string('num_documento_usuario',50).notNullable()

      table.timestamps(true)
    })
  }

  public async down () {
    this.schema.dropTable(this.tableName)
  }
}
