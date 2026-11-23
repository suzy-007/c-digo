/* Conexao com Banco de Dados */

const Sequelize = require('sequelize')

const sequelize = new Sequelize({

    dialect: 'sqlite',

    storage: './database.sqlite'

})

sequelize.authenticate().then(function () {

    console.log("Conectado!!")

}).catch(function (erro) {

    console.log("Erro ao conectar: " + erro)

})

module.exports = { Sequelize, sequelize }