# API Products

## Get all products

URL: /api/products
METHOD: GET
HEADERS: X
BODY: X

OUTPUT:
- Un array con todos los productos

What are we able to test?
- Get a 200 status
- Get a Json as answer
- Get an array of products


## To create a product

URL: /api/products/
METHOD: POST
HEADERS: X
BODY: name, description, department, price, stock, available

OUTPUT:
 - The new created product.

What are we able to test?
 - The URL must works. It must returns 201 status and Content-Type: application/json
 - Check if the answer contains: _id
 - Check if the fields which we send trough the body are saved in the database


## Updating database

URL: /api/products/{PRODUCT_ID}
METHOD: PUT
HEADERS: X
BODY: The fields which we want to modify

OUTPUT:
 - The updated product

What can I test?
 - The URL works: status -> 201 and Content-Type: application/json
 - The values that we modified are changed in data base

WARNING!!
 - Before the tests, we create a new product
 - Using the tests we modify that product
 - When we finish the tests, we delete that product


## Delete a product

URL: /api/products/{PRODUCT_ID}
METHOD: DELETE
HEADERS: X
BODY: X

OUTPUT:
 - The deleted product

## Más rutas

- GET /api/product/<PRODUCT_ID> - Retorna un producto a partir de su id
- GET /api/product/dpt?min=<MIN_PRICE>&max=<MAX_PRICE>
- GET /api/product/available - Retorna todos los productos disponibles y con stock mayor de 10

- GET /api/products/price?min=<MIN_PRICE>&max=<MAX_PRICE> - It returns the productos in a price range

## REGISTRO
POST /api/users/register
BODY: username, email, password

## LOGIN
POST: /api/users/login
BODY: email, password

## Añadir producto al carrito
PUT /api/users/add/<PRODUCT_ID>

## Obtener el perfil del usuario
GET /api/users/profile/