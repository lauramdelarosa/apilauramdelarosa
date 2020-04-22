'use strict'

/** @type {typeof import('@adonisjs/lucid/src/Lucid/Model')} */
const Model = use('Model')

class Tarea extends Model {
    project(){
        return this.belongsTo('App/Models/Proyecto')
    }
}

module.exports = Tarea
