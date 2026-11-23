const express = require('express')
const app = express()

/* Configurando o body-parser */

const bodyParser = require("body-parser")

var urlencodedParser = bodyParser.urlencoded({
    extended: false
})

app.use(urlencodedParser)

/* Model de Produto */

const Produto = require("./produto")
const { sequelize } = require("./db")


/* Rota para a pagina inicial */

app.get('/', (req, res) => {

    let home = "<h1>Página Inicial</h1>"

    home += "<a href='/cadProduto'>Cadastrar Produto</a><br>"

    home += "<a href='/buscaProduto'>Consultar Produto</a>"

    res.send(home)

})


/* Rota para a pagina de formulario de cadastro do produto */

app.get('/cadProduto', (req, res) => {

    let form = "<form action='/produto' method='post'>"

    form += "Código: <input type='text' name='codigo' id='codigo'><br>"

    form += "Nome do Produto: <input type='text' name='nome' id='nome'><br>"

    form += "Preço: <input type='text' name='preco' id='preco'><br>"

    form += "Marca: <input type='text' name='marca' id='marca'><br>"

    form += "Descrição: <input type='text' name='descricao' id='descricao'><br>"

    form += "<input type='submit' value='Cadastrar'>"

    form += "</form>"

    res.send(form)

})


/* Rota para inserir um produto na base de dados */

app.post('/produto', (req, res) => {

    Produto.create({

        codigo: req.body.codigo,

        nome: req.body.nome,

        preco: req.body.preco,

        marca: req.body.marca,

        descricao: req.body.descricao

    }).then(function () {

        console.log("Produto inserido com sucesso!")

        res.send("Produto inserido com sucesso!")

    }).catch(function (erro) {

        console.log("Erro ao inserir produto: " + erro)

        res.send("Falha na inserção do produto! Contate a administração.")

    })

})


/* Rota que abre o formulario de consulta de produto */

app.get('/buscaProduto', (req, res) => {

    var formulario = "<form action='/produto' method='get'>"

    formulario += "Nome do Produto: <input type='text' name='nome'><br>"

    formulario += "<button>Busca</button>"

    formulario += "</form>"

    res.send(formulario)

})


/* Rota que faz a consulta dos produtos pelo nome */

app.get('/produto', (req, res) => {

    let nomeForm = req.query.nome

    Produto.findAll({

        where: {
            nome: nomeForm
        }

    }).then(function (produtos) {

        let tabela = "<h2>Produtos encontrados</h2>"

        tabela += "<table border='1'>"

        tabela += "<tr>"
        tabela += "<th>Código</th>"
        tabela += "<th>Nome</th>"
        tabela += "<th>Preço</th>"
        tabela += "<th>Marca</th>"
        tabela += "<th>Descrição</th>"
        tabela += "</tr>"

        produtos.forEach(function (produto) {

            tabela += "<tr>"

            tabela += "<td>" + produto.codigo + "</td>"
            tabela += "<td>" + produto.nome + "</td>"
            tabela += "<td>" + produto.preco + "</td>"
            tabela += "<td>" + produto.marca + "</td>"
            tabela += "<td>" + produto.descricao + "</td>"

            tabela += "</tr>"

        })

        tabela += "</table>"

        if (produtos.length == 0) {

            tabela += "<p>Nenhum produto encontrado!</p>"

        }

        res.send(tabela)

    }).catch(function (erro) {

        console.log("Erro na consulta: " + erro)

        res.send("Falha na busca do produto. Contate a administração.")

    })

})


/* Criando as tabelas e iniciando o servidor */

sequelize.sync().then(function () {

    app.listen(3000, function () {

        console.log("Servidor iniciado na porta 3000!")

    })

})