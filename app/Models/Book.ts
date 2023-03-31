import { DateTime } from 'luxon'
import { BaseModel, column } from '@ioc:Adonis/Lucid/Orm'

export default class Book extends BaseModel {
  @column({ isPrimary: true })
  public id: number

  @column() public  titulo: string
  @column() public  autor: string
  @column() public  editorial: string
  @column() public  formato: string
  @column() public  paginas: number
  @column() public  num_documento_usuario: string


  @column.dateTime({ autoCreate: true })
  public createdAt: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  public updatedAt: DateTime
}
