import knex from "knex"
import config from "../../knexfile"
import { Knex } from "knex"
import { Product, ProductWithRating, Category } from "../types/types";

const knexInstance: Knex = knex(config);

const findCategory = (category:string) =>  knexInstance("categories")
    .select("id")
    .where({ name: category });

const insertProduct = (product:ProductWithRating, categoryId: number| undefined) => 
    knexInstance("products").insert({
        title: product.title,
        price: product.price,
        description: product.description,
        category_id: categoryId,
        image: product.image, 
        rate: product.rating.rate,
        count: product.rating.count
    });

const getAllProducts = () => knexInstance("products")
    .select("products.id", 
    "products.title",
    "products.price",
    "products.description",
    "products.image",
    "products.rate",
    "products.count",
    "categories.name as category")
    .join("categories", "categories.id", "=", "products.category_id");

const getProductById = (id:number) => knexInstance("products")
    .select("products.id", 
    "products.title",
    "products.price",
    "products.description",
    "products.image",
    "products.rate",
    "products.count",
    "categories.name as category")
    .join("categories", "categories.id", "=", "products.category_id")
    .where({"products.id": id });

const updateProduct = (product:ProductWithRating, id:number) => knexInstance("products").update(product).where({id}).returning("*");

const deleteProduct = (id:number) => knexInstance("products").delete().where({ id });


export default{
    findCategory,
    insertProduct,
    getAllProducts,
    getProductById,
    updateProduct,
    deleteProduct,
}