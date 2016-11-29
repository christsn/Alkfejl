'use strict'

const Lucid = use('Lucid')

class Blog extends Lucid {
    user() {
        return this.belongsTo('App/Model/User')
    }

    category(){
        return this.belongsTo('App/Model/Category')
    }

    comment(){
        return this.hasMany('App/Model/Comment')
    }
}

module.exports = Blog
