'use strict'

const Schema = use('Schema')

class BlogsTableSchema extends Schema {

  up () {
    this.create('blogs', (table) => {
      table.increments()
      table.string('title', 255).notNullable()
      table.text('text').notNullable()
      table.integer('likes')
      table.integer('dislikes')
      table.integer('user_id').unsigned().references('id').inTable('users')
      table.integer('category_id').unsigned().references('id').inTable('categories')
      table.timestamps()
    })
  }

  down () {
    this.drop('blogs')
  }

}

module.exports = BlogsTableSchema
