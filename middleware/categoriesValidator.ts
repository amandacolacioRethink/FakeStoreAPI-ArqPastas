import { NextFunction, Request, Response } from "express";
import { object, string, number } from "yup";
import { makeError  } from "../middleware/erroHandler"

const paramsIdValidator = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const paramsData = Number(req.params);
    if (isNaN(paramsData)) {
        throw makeError({ message: "id must be a number", status: 400 });
    }

    const paramsSchema = object({
      id: number().required("Id is required"),
    });

    await paramsSchema.validate({ id: paramsData });
    next();
  } catch (error) {
    next(error);
  }
};

const categoryInsertValidator =  async (
    req: Request, 
    res: Response,
    next: NextFunction) => {
    try {
        const { name }: { name: string } = req.body;
        const schema = object({
          name: string().required("Name is required"),
        });
        await schema.validate({ name },{strict:true});
        next();
    } catch (error) {
        next(error);
    }
};

  const categoryPutValidator = async (
    req: Request,
    res: Response,
    next: NextFunction
  ) => {
    try {
      const paramsData = req.params;
      const productData = req.body;
  
      const paramsSchema = object({
        id: number().required("Id is required"),
      });
  
      const categorySchema = object({
        name: string().required("Category name is required "),
      });
  
      await categorySchema.validate(productData,{strict:true});
      await paramsSchema.validate(paramsData);
  
      next();
    } catch (error) {
      next(error);
    }
  };
  
const categoryValidator = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const category = req.params.category;
    const acceptedCategories = ["electronics", "jewelery", "men's clothing", "women's clothing"];

    if (!acceptedCategories.includes(category)) {
      throw new Error("Invalid category");
    }
    next();
  } catch (error) {
    next(error);
  }
};

export default {paramsIdValidator,categoryInsertValidator,categoryPutValidator,categoryValidator};
