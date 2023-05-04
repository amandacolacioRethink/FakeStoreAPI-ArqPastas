import { Product, ProductWithRating, Category } from "../types/types";
import productsRepository from "../repositories/productsRepository";
import { makeError  } from "../middleware/erroHandler"

const insertProduct=async (product:ProductWithRating) => {
    const categoryExists = await productsRepository.findCategory(product.category)  
    if (!categoryExists[0]) 
        throw makeError({ message: "This category was not found", status: 400 });

    const categoryId: number | undefined = categoryExists[0].id;
    return await productsRepository.insertProduct(product, categoryId)
}

const getAllProducts =async () => {
    const products: Product[] = await productsRepository.getAllProducts();
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

const getProductById =async (id:string) => {
    const product: Product[] = await productsRepository.getProductById(id);
    if (!product.length) throw makeError({ message: "This product was not found", status: 400 });
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

const updateProduct =async (product:any) => {
    const categoryExists = await productsRepository.findCategory(product.category)  
    if (!categoryExists[0]) 
        throw makeError({ message: "This category was not found", status: 400 });

    product.category_id = categoryExists[0].id;
    delete product.category     
    return await productsRepository.updateProduct(product)
}

const deleteProduct =async (id:string) => {
    const product = await productsRepository.deleteProduct(id)
    if (!product) throw makeError({ message: "This product was not found", status: 400 });
    return product
}

export default {
    insertProduct,
    getAllProducts,
    getProductById,
    updateProduct,
    deleteProduct
}