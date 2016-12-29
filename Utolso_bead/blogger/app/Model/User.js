'use strict'

const Lucid = use('Lucid')

class User extends Lucid {

  apiTokens () {
    return this.hasMany('App/Model/Token')
  }

  blog(){
    return this.hasMany('App/Model/Blog')
  }

  comment(){
    return this.hasMany('App/Model/Comment')
  }

  follow(){
    return this.hasMany('App/Model/Follow')
  }

}

module.exports = User
