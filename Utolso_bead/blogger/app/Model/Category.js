'use strict'

const Lucid = use('Lucid')

class Category extends Lucid {
    blogs (){
        return this.hasMany('App/Model/Blog')
    }
}

module.exports = Category
