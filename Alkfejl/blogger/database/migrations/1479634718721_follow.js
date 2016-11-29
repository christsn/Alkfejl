'use strict'

const Schema = use('Schema')

class FollowTableSchema extends Schema {

  up () {
    this.create('follow', (table) => {
      table.increments()
      table.integer('follower').unsigned().references('id').inTable('users')
      table.integer('following').unsigned().references('id').inTable('users')
      table.timestamps()
    })
  }

  down () {
    this.drop('follow')
  }

}

module.exports = FollowTableSchema
