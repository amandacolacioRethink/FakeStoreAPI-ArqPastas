import knex from "knex"
import config from "../../knexfile"
import { Knex } from "knex"
import { Product, ProductWithRating, Category } from "../types/types";

const knexInstance: Knex = knex(config);

const findCategoryRepository =async (category:string) => {
 return await knexInstance("categories")
    .select("id")
    .where({ name: category });
}
const insertProductRepository =async (product:ProductWithRating, categoryId: number| undefined) => {
   return await knexInstance("products").insert({
        title: product.title,
        price: product.price,
        description: product.description,
        category_id: categoryId,
        image: product.image, 
        rate: product.rating.rate,
        count: product.rating.count
    });
}

const getAllProductsRepository =async () => {
    return await knexInstance("products")
    .select("*", "categories.name as category","products.id as id")
    .join("categories", "categories.id", "=", "products.category_id");
}

const getProductByIdRepository =async (id:string) => {
    return await knexInstance("products")
    .select("*", "categories.name as category")
    .join("categories", "categories.id", "=", "products.category_id")
    .where({"products.id": id });
}
const updateProduct =async (product:Product, id:string) => {
    return await knexInstance("products").update(product).where({ id });
}

const deleteProduct =async (id:string) => {
    return await knexInstance("products").delete().where({ id });
}

const updateCategory =async (name:string, id:string) => {
    return await knexInstance("categories")
    .select("id")
    .where({ name: name });
}
export default{
    findCategoryRepository,
    insertProductRepository,
    getAllProductsRepository,
    getProductByIdRepository,
    updateProduct,
    deleteProduct,
    updateCategory
}