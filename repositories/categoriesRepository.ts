import knex from "knex";
import config from "../../knexfile";
import { Knex } from "knex";

const knexInstance: Knex = knex(config);

const getCategoriesNames = () => knexInstance("categories").select("name");

const findCategory= (name:string)=> knexInstance("categories").select("id").where({ "categories.name": name });

const getCategoryById = (id: number) => knexInstance("categories").select("*").where({ "categories.id": id });

const getProductsByCategory = (categoryId:number) => knexInstance("products")
.select(
  "products.id",
  "products.title",
  "products.price",
  "products.description",
  "products.image",
  "categories.name as category ",
  "products.rate",
  "products.count"
)
.join("categories", "categories.id", "=", "products.category_id")
.where({ "products.category_id": categoryId });

const selectCategoryByName =  (name: string) => knexInstance("categories")
    .select("*")
    .where({ "categories.name": name });

const createCategory =  (name: string) => knexInstance("categories").insert({ name });

const updateCategory =  (name: string, id: number) => knexInstance("categories").update({ name }).where({ id });

const deleteCategory =  (id: number) => knexInstance("categories").delete().where({ id });

export default {
  getCategoriesNames,
  getCategoryById,
  selectCategoryByName,
  createCategory,
  updateCategory,
  deleteCategory,
  getProductsByCategory,
  findCategory
};