import { Router } from "express"
import githubController from "../../controllers/githubController.js"

const router = Router();

router.get("/login", githubController.showLoginPage);
router.get("/error", githubController.showErrorPage);

export default router;