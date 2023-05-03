import { Product, ProductWithRating, Category } from "../types/types";
import productsRepository from "../repositories/productsRepository";
import categoriesServices from "../services/categoriesService";

const findCategoryService =async (category:string) => {
    const categoryExists = await productsRepository.findCategoryRepository(category)  
    if (!categoryExists[0]) throw new Error("This category was not found");
    return categoryExists[0].id;
}

const insertProductService =async (product:ProductWithRating, categoryId:number|undefined) => {
    return await productsRepository.insertProductRepository(product, categoryId)
}

const getAllProductsService =async () => {
    const products: Product[] = await productsRepository.getAllProductsRepository();
    return products.map((product) => ({
        id: product.id,
        title: product.title,
        price: product.price,
        description: product.description,
        category: product.category,
        image: product.image,
        rating:{rate:product.rate, count: product.count },
      }));
}

const getProductByIdService =async (id:string) => {
    const product: Product[] = await productsRepository.getProductByIdRepository(id);
    if (!product.length) throw new Error("This product was not found");
    return product.map((product) => ({
        id: parseInt(id),
        title: product.title,
        price: product.price,
        description: product.description,
        category: product.category,
        image: product.image,
        rating: {rate: product.rate, count:product.count}
      }));    
}

const updateProduct =async (product:Product, id:string) => {
    if (product.category)
    {
      const categoryData:any = await productsRepository.updateCategory(product.category,id)
       product.category = categoryData[0].id;
     }
    return await productsRepository.updateProduct(product, id)
}

const deleteProduct =async (id:string) => {
    const product = await productsRepository.deleteProduct(id)
    if (!product) throw new Error("This product was not found");
    return product
}

export default {
    findCategoryService,
    insertProductService,
    getAllProductsService,
    getProductByIdService,
    updateProduct,
    deleteProduct
}