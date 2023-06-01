import { Router } from "express";
import user from "../controllers/loginController";
import middleware from "../middleware/authetication"
const router: Router = Router();

router.post("/", user.insert);
router.post("/login", user.login);
router.get("/", user.index);
router.get("/:id",user.show);
router.delete("/:id",middleware.authToken,user.remove);
router.put("/:id", middleware.authToken, user.update);


export { router };