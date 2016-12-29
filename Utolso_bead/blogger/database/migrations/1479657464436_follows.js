'use strict'

const Schema = use('Schema')

class FollowsTableSchema extends Schema {

  up () {
    this.create('follows', (table) => {
      table.increments()
      table.integer('follower').unsigned().references('id').inTable('users')
      table.integer('following').unsigned().references('id').inTable('users')
      table.timestamps()
    })
  }

  down () {
    this.drop('follows')
  }

}

module.exports = FollowsTableSchema
