import categoriesRepository from "../repositories/categoriesRepository";
import { Category } from "../types/types";
import { makeError  } from "../middleware/erroHandler"

const getCategoriesNames = async () => {
  const categories: Category[] =
  await categoriesRepository.getCategoriesNames();
  return categories.map((category: Category) => category.name);
};

const getCategoryById = async (id: number) => {
    const category = await categoriesRepository.getCategoryById(id);
    if (!category.length) throw makeError({ message: "Category not found", status: 400 });
    return category[0];
  }
  
const createCategory = async (name: string) => {
    const searchCategoryByName = await categoriesRepository.selectCategoryByName(name);
    if (!searchCategoryByName.length) {
      const createdCategoryId = await categoriesRepository.createCategory(name);
      return { id: createdCategoryId[0], name };
    }
    throw makeError({ message: "Category already exists", status: 400 });
};

const updateCategory = async (name: string, id: number) => {
    const searchCategoryByName = await categoriesRepository.selectCategoryByName(name);
    if (!searchCategoryByName.length) {
      const updatedCategory = await categoriesRepository.updateCategory(name, id);
      if (!updatedCategory) throw new Error("Could not update category");
      return { id, name };
    }
    throw makeError({ message: "Category already exists", status: 400 });
};

const deleteCategory = async (id: number) => {
    const deletedCategory = await categoriesRepository.deleteCategory(id);
    if (!deletedCategory) throw makeError({ message: "Category doesn't exists", status: 400 });
    return { message: "Category deleted" };
};

export default {
  getCategoriesNames,
  getCategoryById,
  createCategory,
  updateCategory,
  deleteCategory,
};