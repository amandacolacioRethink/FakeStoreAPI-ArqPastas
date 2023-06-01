import { router as productsRoutes } from "./productsRoutes";
import { router as loginRoutes } from "./loginRoutes";


import { Router } from "express";

const router: Router = Router();

router.use("/products", productsRoutes)
router.use("/user",loginRoutes)


export { router };