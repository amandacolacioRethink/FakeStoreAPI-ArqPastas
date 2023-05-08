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
    res.status(201).json(createdProduct);
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
    const product = await productsService.getProductById(id);
    res.status(200).json(product);
  } catch (error: unknown) {
    next(error)
  }
};

const put = async (req: Request, res: Response, next:NextFunction ) => {
  try {
    const id:string = req.params.id;
    const product: ProductWithRating = req.body;
    const updatedProduct = await productsService.putProduct(product,Number(id))

    res.status(200).json(updatedProduct);
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

const patch = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const id: string = req.params.id;
    const product = req.body;
    const patchProduct = await productsService.patchProduct(parseInt(id), product);
    res.status(200).send(patchProduct);
  } catch (error) {
    next(error);
  }
};

export default { insert,index,show,put,remove,patch};