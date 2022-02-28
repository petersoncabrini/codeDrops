// Iniciando com Node.JS, utilizando o framework Express

const express = require ('express')
const {randomUUID} = require ('crypto') // gera um id universal
const fs = require ('fs')

const app = express()

app.use(express.json())

// app.get('/primeiraRota', (request, response) => {
//     return response.json({
//         message: 'Acessou a primeira rota com nodemon'
//     })
// })

let products = [] // array in memory

fs.readFile('products.json', 'utf-8', (err, data) => {
    if (err){
        console.log(err)
    } else {
        products = JSON.parse(data)
    }
})

// POST -> Inserir um dado
// GET -> Buscar um ou mais dados
// PUT -> Alterar um dado
// Delete -> Remover um dado

// Body -> Sempre que eu quiser enviar dados para minha aplicacao
// Params -> /product/34271
// Query -> /product?id=34271&value=34271

// Post
app.post('/products', (request, response) => {
    // Name and price

const {name, price} = request.body

const product = {
    name,
    price,
    id: randomUUID()
}

products.push(product)

ProductFile()

return response.json(product)
})

// Get
app.get('/products', (request, response) => {
    return response.json(products)
})

app.get('/products/:id', (request, response) => {
    const {id} = request.params
    const product = products.find(product => product.id === id)
    return response.json(product)
})

// Put
app.put('/products/:id', (request, response) => {
    const {id} = request.params
    const {name, price} = request.body

    const productIndex = products.findIndex(product => product.id === id)
    products[productIndex] = {
    ...products[productIndex],
    name,
    price
    }

    productFile()
    
    return response.json({
        message: 'Produto alterado com sucesso'
    })
})

// Delete
app.delete('/products/:id', (request, response) => {
    const {id} = request.params
    const productIndex = products.findIndex(product => product.id === id)
    products.splice(productIndex, 1)

    productFile()

    return response.json({
        message: 'Produto removido com sucesso'
    })
})

function productFile() {
    fs.writeFile('products.json', JSON.stringify(products), (err) => {
        if (err) {
            console.log(err)
        } else {
            console.log('Produto inserido')
        }
    })
}

app.listen(4002, () => console.log('Servidor esta rodando na porta 4002'))