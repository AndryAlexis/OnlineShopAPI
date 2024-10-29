const request = require('supertest')
const expressApp = require('../../src/app')
const mongoose = require('mongoose')
const Product = require('../../src/models/api/products.model')

describe('Products\'s API', () => {

    beforeAll(async () => {
        const IP = '127.0.0.1'
        const DB_PORT = '27017'
        //Connection to the data base.
        await mongoose.connect(`mongodb://127.0.0.1:27017/online-shop-test`)
    })

    afterAll(async () => {
        await mongoose.disconnect()
    })

    describe('GET /api/products', () => {
        let response

        beforeAll(async () => {
            response = await 
                request(expressApp)
                    .get('/api/products')
                    .send()
        })
        
        it('Should response with 200 status', () => {
            expect(response.statusCode)
                .toBe(200)
        })

        it('Should response with a JSON', () => {
            expect(response.headers['content-type'])
                .toContain('application/json')
        })

        it('Should reponse with an array', () => {
            expect(response.body)
                .toBeInstanceOf(Array)
        })
    })

    describe('POST /api/products', () => {

        let response
        const body = {
            name: 'Green pencil',
            description: 'This is a description',
            department: 'test',
            price: 69,
            stock: 1,
            available : true
        }

        beforeAll(async () => {
            response = await request(expressApp)
                .post('/api/products')
                .send(body)
        })

        afterAll(async () => {
            // Delete all product with test as value in deparment document
            await Product.deleteMany({
                deparment: 'test'
            })
        })

        it('The URL should works', () => {
            expect(response.statusCode).toBe(201)
            expect(response.headers['content-type']).toContain('application/json')
        })

        it('It should returns a correct _id', () => {
            expect(response.body._id).toBeDefined()
        })

        it('The values sent are the same which has been saved', () => {
            expect(response.body.name).toBe(body.name)
            expect(response.body.description).toBe(body.description)
            expect(response.body.price).toBe(body.price)
            expect(response.body.department).toBe(body.department)
            expect(response.body.stock).toBe(body.stock)
            expect(response.body.name).toBe(body.name)
            expect(response.body.available).toBe(body.available)

        })
    })

    describe('PUT /api/products/<PRODUCT_ID>', _ => {
        let product = null
        let response = null

        beforeAll(async () => {
            // First off, create the product which we want to update
            product = await Product.create({
                name: 'Lapiz',
                description: 'Pinta',
                department: 'test',
                price: 34,
                stock: 200,
                available: true
            })

            // Second, throw the REQUEST PUT about the created product
            response = await 
                request(expressApp)
                    .put(`/api/products/${product._id}`)
                    .send({
                        price: 30,
                        stock: 50
                    })
        })

        afterAll(async () => {
            await Product.findByIdAndDelete(product._id)
        })

        it('It should works the URL',  () => {
            expect(response.statusCode).toBe(200)
            expect(response.headers['content-type']).toContain('application/json')
        })

        it('It should has updated fields in data base', () => {
            expect(response.body.price).toBe(30)
            expect(response.body.stock).toBe(50)

        })

    })

    describe('DELETE /api/products/<PRODUCT_ID>', () => {

        const body = {
            name: 'Lapiz',
            description: 'Pinta',
            department: 'test',
            price: 34,
            stock: 200,
            available: true
        }

        let product = null
        let response = null

        beforeAll(async () => {
            // First off, create the product which we want to update
            product = await Product.create(body)

            // Second, throw the REQUEST PUT about the created product
            response = await 
                request(expressApp)
                    .delete(`/api/products/${product._id}`)
                    .send()
        })

        afterAll(async () => {
            await Product.findByIdAndDelete(product._id)
        })

        it('the product should not exist in DB', async () => {
            const deletedProduct = await Product.findById(product._id)
        })
    })
})