const { connect, disconnect } = require('mongoose')
const { Brand, Product, Stock } = require('./models')

connect('mongodb://localhost:27017/my-store')
    .then(() => Promise.all([Brand.deleteMany(), Product.deleteMany(), Stock.deleteMany()])) //limpiamos todos los documentos de la colección --> evitamos duplicados
    .then(() => {
        const nike = new Brand({ name: 'Nike' })
        const adidas = new Brand({ name: 'Adidas' })
        const newBal = new Brand({ name: 'New Balance' })
        const puma = new Brand({ name: 'Puma' })
        const vans = new Brand({ name: 'Vans' })
        const converse = new Brand({ name: 'Converse' })

        return Promise.all([
            nike.save(),
            adidas.save(),
            newBal.save(),
            puma.save(),
            vans.save(),
            converse.save()
        ])
    })
    .then(brands => {
        const [nike, adidas, newBal, puma, vans, converse] = brands

        const airMax = new Product({ brand: nike.id, pid: 'NIKE-AIR-MAX', model: 'Air Max', price: 120, image: 'https://static.nike.com/a/images/c_limit,w_592,f_auto/t_product_v1/f442caeb-d894-4de7-8a83-b736e01ab548/air-max-90-g-zapatillas-de-golf-Jqzw8K.png' })
        const nizza = new Product({ brand: adidas.id, pid: 'ADIDAS-NIZZA', model: 'Nizza', price: 80, image: 'https://assets.adidas.com/images/w_600,f_auto,q_auto/1ef7f87103e24092b27fa89700a8b059_9366/Zapatilla_Nizza_Negro_CQ2332_01_standard.jpg' })

        return Promise.all([
            airMax.save(),
            nizza.save()
        ])
    })
    .then(products => {
        const [airMax, nizza] = products

        const airMax42Stock = new Stock({ product: airMax.id, color: 'black', size: 42, quantity: 100 })
        const airMax43Stock = new Stock({ product: airMax.id, color: 'black', size: 43, quantity: 150 })
        const airMax44Stock = new Stock({ product: airMax.id, color: 'black', size: 44, quantity: 150 })

        return Promise.all([
            airMax42Stock.save(),
            airMax43Stock.save(),
            airMax44Stock.save()
        ])
    })
    .then(() => disconnect())