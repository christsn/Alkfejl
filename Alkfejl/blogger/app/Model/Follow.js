'use strict'

const Lucid = use('Lucid')

class Follow extends Lucid {
    user() {
        return this.hasMany('App/Model/User')
    }
}

module.exports = Follow
