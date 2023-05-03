import { Request, Response } from "express";
import knex from "knex";
import config from "../../knexfile";
import { Category, Product,ProductWithRating } from "../types/types";
import productsService from "../services/productsService";

const knexInstance = knex(config);

const insert = async (req: Request, res: Response) => {
  try {
    const product:ProductWithRating = req.body;
    const categoryId: number | undefined = await productsService.findCategoryService(product.category);
    const createdProduct = await productsService.insertProductService(product, categoryId); 
    res.status(201).json({ id: createdProduct[0], ...product});
  } catch (error:any) {
    res.send(error.message ?{error: error.message}: error);
  }
};

const index = async (req: Request, res: Response) => {
  try {
    const products:ProductWithRating[] = await productsService.getAllProductsService()    
    res.status(200).json(products);
  } catch (error:any) {
    res.send(error.message ? { error: error.message } : error);
  }
};

const show = async (req: Request, res: Response) => {
  try {
    const id : string = req.params.id;
    const product : ProductWithRating[] = await productsService.getProductByIdService(id);
    res.status(200).json(product[0]);
  } catch (error: any) {
    res.send(error.message ? { error: error.message } : error);
  }
};

const update = async (req: Request, res: Response) => {
  try {
    const id:string = req.params.id;
    const {title , price, description, category, image, rating }: ProductWithRating = req.body;
    const updateData: any = { title , price, description, image, rate:rating.rate, count:rating.count };
    if (category) {
      const categoryData :any= await knexInstance("categories")
        .select("id")
        .where({ name: category });

      if (!categoryData[0]) {
        throw new Error("This category was not found");
      }
      updateData.category_id = categoryData[0].id;
    }

    await knexInstance("products").update(updateData).where({ id });

    res.status(200).json({ title , price, description, category, image, rating });
  } catch (error: any) {
    res.send(error.message ? { error: error.message } : error);
  }
};

const remove = async (req: Request, res: Response) => {
  try {
    const id:string = req.params.id;
    const product = await knexInstance("products").delete().where({ id });

    if (!product) throw new Error("This product was not found");

    res.status(200).json({ mensagem: "Product deleted" });
  } catch (error: any) {
    res.send(error.message ? { error: error.message } : error);
  }
};


export default { insert,index,show,update,remove};