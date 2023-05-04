import { Request, Response,NextFunction } from "express";
import categoriesServices from "../services/categoriesService";

const index = async (_req: Request, res: Response,next:NextFunction): Promise<void> => {
  try {
    const categoriesArray = await categoriesServices.getCategoriesNames();
    res.status(200).send(categoriesArray);
  } catch (error: unknown) {
    next(error)
  }
};

const show = async (req: Request, res: Response,next:NextFunction): Promise<void> => {
  try {
    const id: number = parseInt(req.params.id);
    const category = await categoriesServices.getCategoryById(id);
    res.status(200).send(category);
  } catch (error: unknown) {
    next(error)
  }
};

const insert = async (req: Request, res: Response,next:NextFunction): Promise<void> => {
  try {
    const { name }: { name: string } = req.body;
    const createdCategory = await categoriesServices.createCategory(name);
    res.status(201).send(createdCategory);
  } catch (error: unknown) {
    next(error)
  }
};

const update = async (req: Request, res: Response,next:NextFunction): Promise<void> => {
  try {
    const id: number = parseInt(req.params.id);
    const { name }: { name: string } = req.body;
    const category = await categoriesServices.updateCategory(name, id);
    res.status(201).send(category);
  } catch (error: unknown) {
    next(error)
  }
};

const remove = async (req: Request, res: Response,next:NextFunction): Promise<void> => {
  try {
    const id: number = parseInt(req.params.id);
    const category = await categoriesServices.deleteCategory(id);
    res.status(200).json(category);
  } catch (error: unknown) {
    next(error)
  }
};

export default { index, show, insert, update, remove };