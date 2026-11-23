/* Model de Produto */

const { Sequelize, sequelize } = require("./db")

const Produto = sequelize.define('produto', {

    codigo: {
        type: Sequelize.STRING
    },

    nome: {
        type: Sequelize.STRING
    },

    preco: {
        type: Sequelize.DOUBLE
    },

    marca: {
        type: Sequelize.STRING
    },

    descricao: {
        type: Sequelize.STRING
    }

});

// Produto.sync()

module.exports = Produto