import { Router } from "express";
import productsControllers from "../controllers/productsControllers";
import {categories, category} from "./categoriesRoutes"
import middleware from "../middleware/productsValidator"
const router: Router = Router();

router.use('/categories', categories);
router.use('/category', category)

router.post("/", middleware.productInsertValidator,productsControllers.insert);
router.get("/", productsControllers.index);
router.get("/:id", middleware.productIdValidator, productsControllers.show);
router.delete("/:id",middleware.productIdValidator, productsControllers.remove);
router.put("/:id",middleware.productIdValidator,middleware.productPutValidator, productsControllers.put);
router.patch("/:id",middleware.productIdValidator, middleware.productPatchValidator, productsControllers.patch);


export { router };