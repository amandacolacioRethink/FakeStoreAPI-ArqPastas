const productParams = {
    "title": "Teste de Produto passando por parâmetro",
    "price": 19.90,
    "description": "passando por parâmetro esse produto para realizar os testes",
    "category": "men's clothing",
    "image": "https://fakestoreapi.com/img/61pHAEJ4NML._AC_UX679_.jpg",
    "rating": {
        "rate": 3.6,
        "count": 145
    }
}
const productPatchProduct = {
    "title":"teste"
}

const getAllProductsParams = {
    "id": 3,
    "title": 'testes com jest',
    "price": 19.9,
    "description": 'teste',
    "image": 'https://fakestoreapi.com/img/61pHAEJ4NML._AC_UX679_.jpg',
    "rating":{},
    "category": "men's clothing"
}

const categoryParams={
    "name": "Teste de categoria"
}

const categoryNames=[
    "electronics",
    "jewelery",
    "men's clothing",
    "women's clothing",
    "teste",
    "olá",
    "teste2"
]

const userParams ={
    "user": "amanda.colacio@rethink.dev",
    "password": ""
}

export {productParams, categoryParams,userParams,getAllProductsParams,productPatchProduct,categoryNames}