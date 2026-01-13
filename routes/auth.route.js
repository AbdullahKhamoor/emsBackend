import express from "express"
import { login, verify } from "../controllers/auth.controller.js"
import verifyUser from "../middleware/auth.middleware.js"

const router = express.Router()

router.post('/login', login)
router.get('/verify', verifyUser, verify )

export default router;