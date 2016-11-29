'use strict'

const Schema = use('Schema')

class CommentTableSchema extends Schema {

  up () {
    this.create('comment', (table) => {
      table.increments()
      table.text('text').notNullable()
      table.integer('user_id').unsigned().references('id').inTable('users')
      table.integer('blog_id').unsigned().references('id').inTable('blog')
      table.timestamps()
    })
  }

  down () {
    this.drop('comment')
  }

}

module.exports = CommentTableSchema
