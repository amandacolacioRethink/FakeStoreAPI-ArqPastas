import { Router } from "express";
import productsControllers from "../controllers/productsControllers";
import {categories, category} from "./categoriesRoutes"
import middleware from "../middleware/productsValidator"
import middlewareAuth from "../middleware/authetication"
const router: Router = Router();

router.use('/categories', categories);
router.use('/category', category)

router.post("/", middlewareAuth.authToken,middleware.productInsertValidator,productsControllers.insert);
router.get("/", productsControllers.index);
router.get("/:id", middleware.productIdValidator, productsControllers.show);
router.delete("/:id",middlewareAuth.authToken,middleware.productIdValidator, productsControllers.remove);
router.put("/:id",middlewareAuth.authToken,middleware.productIdValidator,middleware.productPutValidator, productsControllers.put);
router.patch("/:id",middlewareAuth.authToken,middleware.productIdValidator, middleware.productPatchValidator, productsControllers.patch);


export { router };