import { Router } from "express";
import {renderResetPassword,renderEmailSent} from "../../controllers/emailController.js"

const router = Router()

router.get("/reset-password", renderResetPassword);
router.get('/email-sent', renderEmailSent);

export default router;