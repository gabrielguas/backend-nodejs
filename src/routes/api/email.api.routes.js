import { Router } from "express";
import { sendEmailToResetPassword, resetPassword, updatePassword } from "../../utils/mail.js" // sacar esto al controller

const router = Router();
router.post("/send-email-to-reset", sendEmailToResetPassword);
router.get("/reset-password/:token", resetPassword);
router.post('/update-password/:token', updatePassword)


export default router;
