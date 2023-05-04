import { NextFunction, Request, Response } from "express";
import knex from "knex";
import config from "../../knexfile";
import { ProductWithRating } from "../types/types";
import productsService from "../services/productsService";

const knexInstance = knex(config);

const insert = async (req: Request, res: Response, next:NextFunction) => {
  try {
    const product:ProductWithRating = req.body;
    const createdProduct = await productsService.insertProduct(product); 
    res.status(201).json({ id: createdProduct[0], ...product});
  } catch (error: unknown) {
    next(error)
  }
};

const index = async (req: Request, res: Response, next:NextFunction) => {
  try {
    const products:ProductWithRating[] = await productsService.getAllProducts()    
    res.status(200).json(products);
  } catch (error: unknown) {
    next(error)
  }
};

const show = async (req: Request, res: Response, next:NextFunction) => {
  try {
    const id : string = req.params.id;
    const product : ProductWithRating[] = await productsService.getProductById(id);
    res.status(200).json(product[0]);
  } catch (error: unknown) {
    next(error)
  }
};

const update = async (req: Request, res: Response, next:NextFunction ) => {
  try {
    const id:string = req.params.id;
    const {title , price, description,category, image, rating }: ProductWithRating = req.body;
    const product = {id,title, price,description,category, image,rate:rating.rate, count:rating.count}
    await productsService.updateProduct(product)

    res.status(200).json({id,title , price, description,category, image, rating  });
  } catch (error: unknown) {
    next(error)
  }
};

const remove = async (req: Request, res: Response, next:NextFunction) => {
  try {
    const id:string = req.params.id;
    await productsService.deleteProduct(id)

    res.status(200).json({ mensagem: "Product deleted" });
  } catch (error: unknown) {
    next(error)
  }
};


export default { insert,index,show,update,remove};