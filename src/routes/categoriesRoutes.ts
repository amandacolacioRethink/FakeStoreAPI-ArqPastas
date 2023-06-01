import { Router } from "express";
import categoriesControllers from "../controllers/categoriesController";
import middleware from "../middleware/categoriesValidator"
import middlewareAuth from "../middleware/authetication"

const categories: Router = Router();
const category: Router = Router();

categories.post("/",middlewareAuth.authToken, middleware.categoryInsertValidator, categoriesControllers.insert);
categories.get("/", categoriesControllers.index);
category.get("/:category", middleware.categoryValidator,categoriesControllers.show);
categories.put("/:id",middlewareAuth.authToken, middleware.categoryPutValidator,categoriesControllers.update);
categories.delete("/:id",middlewareAuth.authToken,middleware.paramsIdValidator,categoriesControllers.remove);

export { categories, category };