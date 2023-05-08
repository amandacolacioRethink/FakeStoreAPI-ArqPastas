import { Product, ProductWithRating, Category } from "../types/types";
import productsRepository from "../repositories/productsRepository";
import { makeError  } from "../middleware/erroHandler"
import { string } from "yup";

const insertProduct=async (product:ProductWithRating) => {
    const categoryExists = await productsRepository.findCategory(product.category)  
    if (!categoryExists[0]) 
        throw makeError({ message: "This category was not found", status: 400 });

    const categoryId: number | undefined = categoryExists[0].id;
    const createdProduct = await productsRepository.insertProduct(product, categoryId)
    return { id: createdProduct[0], ...product}
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
    const formattedProduct = product.map((product) => ({
        id: parseInt(id),
        title: product.title,
        price: product.price,
        description: product.description,
        category: product.category,
        image: product.image,
        rating: {rate: product.rate, count:product.count}
      })); 
    return formattedProduct[0]   
}

const putProduct =async (product:any, id:number) => {
    const categoryExists = await productsRepository.findCategory(product.category)  
    if (!categoryExists[0]) 
        throw makeError({ message: "This category was not found", status: 400 });

    product.category_id = categoryExists[0].id;
    product.rate =product.rating.rate;
    product.count =product.rating.count;

    delete product.category 
    delete product.rating    
    const productId=await productsRepository.updateProduct(product,id)

    if (!productId)
    throw makeError({ message: "Product not found", status: 400 });
    return {id:id, ...product};
}

const deleteProduct =async (id:string) => {
    const product = await productsRepository.deleteProduct(id)
    if (!product) throw makeError({ message: "This product was not found", status: 400 });
    return product
}

const patchProduct = async (id: number, product: any) => {
    const newProduct = { ...product, ...product.rating };
    delete newProduct.rating;
    delete newProduct.category;
  
    let categoryId;
  
    if (product.category) {
      const category = await productsRepository.findCategory(product.category!);
  
      if (category.length === 0) {
        throw makeError({ message: "Categoria was not found", status: 400 });
      }
  
      categoryId = category[0].id;
    }
  
    await productsRepository.updateProduct(
      {
        ...newProduct,
        category_id: product.category ? categoryId : undefined,
      },
      id
    );
    delete product.category  
    const productFromDatabase = await productsRepository.updateProduct(product,id);
  
    const updatedProductFormatted = productFromDatabase.map((product) => ({
      id: id,
      title: product.title,
      price: product.price,
      description: product.description,
      category: product.category,
      image: product.image,
      rating: {rate: product.rate, count:product.count}
    })); 
    return updatedProductFormatted[0];
  };

export default {
    insertProduct,
    getAllProducts,
    getProductById,
    putProduct,
    deleteProduct,
    patchProduct
}