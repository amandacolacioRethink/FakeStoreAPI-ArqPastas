import { Router } from "express";
import categoriesControllers from "../controllers/categoriesController";
import middleware from "../middleware/categoriesValidator"

const categories: Router = Router();
const category: Router = Router();

categories.post("/", middleware.categoryInsertValidator, categoriesControllers.insert);
categories.get("/", categoriesControllers.index);
category.get("/:category", middleware.categoryValidator,categoriesControllers.show);
categories.put("/:id", middleware.categoryPutValidator,categoriesControllers.update);
categories.delete("/:id",middleware.paramsIdValidator,categoriesControllers.remove);

export { categories, category };