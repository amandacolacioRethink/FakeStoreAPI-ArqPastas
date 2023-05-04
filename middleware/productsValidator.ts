import { NextFunction, Request, Response } from "express";
import { object, string, number } from "yup";
import { makeError  } from "../middleware/erroHandler"

const productInsertValidator = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const productData = req.body;

    const productSchema = object({
      title: string().required("Product name is required"),
      price: number().positive().required("Price must be a positive number"),
      description: string().required(),
      category: string().required(),
      image: string().required(),
      rating: object({
        rate: number().required(),
        count: number().required(),
      }),
    });

    await productSchema.validate(productData, {strict:true});
    next();
  } catch (error) {
    next(error);
  }
};

const productIdValidator = async (
    req: Request,
    res: Response,
    next: NextFunction
  ) => {
    try {
      const productId = Number(req.params.id);
  
      if (isNaN(productId) || !Number.isInteger(productId) || productId <= 0) 
       throw makeError({ message: "Invalid product id", status: 400 });
  
      next();
    } catch (error) {
      next(error);
    }
  };

const productPutValidator = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const pathProduct = req.params;
    const productData = req.body;

    const productSchema = object({
      title: string().required(),
      price: number().required(),
      description: string().required(),
      category: string().required(),
      image: string().required(),
      rating: object({
        rate: number().required(),
        count: number().required(),
      }),
    });

    const pathProductSchema = object({
      id: string().required("Id is required"),
    });

    await pathProductSchema.validate(pathProduct);
    await productSchema.validate(productData, {strict:true});
    next();
  } catch (error) {
    next(error);
  }
};

const productPatchValidator = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const productData = req.body;

    const productSchema = object({
      title: string(),
      price: number(),
      description: string(),
      category: string(),
      image: string(),
      rating: object({
        rate: number(),
        count: number(),
      }),
    });

    await productSchema.validate(productData, {strict:true});
    next();
  } catch (error) {
    next(error);
  }
};

export default {
  productInsertValidator,
  productIdValidator,
  productPutValidator,
  productPatchValidator
};