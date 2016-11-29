'use strict'

const Schema = use('Schema')

class CommentsTableSchema extends Schema {

  up () {
    this.create('comments', (table) => {
      table.increments()
       table.text('text').notNullable()
      table.integer('user_id').unsigned().references('id').inTable('users')
      table.integer('blog_id').unsigned().references('id').inTable('blogs')
      table.timestamps()
    })
  }

  down () {
    this.drop('comments')
  }

}

module.exports = CommentsTableSchema
