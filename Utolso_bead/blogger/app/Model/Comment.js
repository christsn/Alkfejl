'use strict'

const Lucid = use('Lucid')

class Comment extends Lucid {
    user() {
        return this.belongsTo('App/Model/User')
    }
    blog() {
        return this.belongsTo('App/Model/Blog')
    }
}

module.exports = Comment
