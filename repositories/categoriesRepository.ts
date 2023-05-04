import knex from "knex";
import config from "../../knexfile";
import { Knex } from "knex";

const knexInstance: Knex = knex(config);

const getCategoriesNames = () => knexInstance("categories").select("name");

const getCategoryById = (id: number) => knexInstance("categories").select("*").where({ "categories.id": id });

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
};