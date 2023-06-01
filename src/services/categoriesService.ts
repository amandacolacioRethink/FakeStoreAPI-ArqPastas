import categoriesRepository from "../repositories/categoriesRepository";
import { Category } from "../types/types";
import { makeError  } from "../middleware/erroHandler"

const getAllCategories =async () => await categoriesRepository.getAllCategories();

const getCategoriesNames = async () => {
  const categories: Category[] =
  await categoriesRepository.getCategoriesNames();
  console.log(categories)
  return categories.map((category: Category) => category.name);
};

const getProductsByCategory  = async (name:string) => {
  const categoryId = await categoriesRepository.findCategory(name)
  const products = await categoriesRepository.getProductsByCategory(categoryId[0].id);
  if (!products.length) throw makeError({ message: "Category not found", status: 400 });
  return products.map((product: any) => ({
    id: product.id,
    title: product.title,
    price: product.price,
    description: product.description,
    category: product.category,
    image: product.image,
    rating: {
      rate: product.rate,
      count: product.count,
    },
  }));
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
  getAllCategories,
  getCategoriesNames,
  getCategoryById,
  createCategory,
  updateCategory,
  deleteCategory,
  getProductsByCategory
};