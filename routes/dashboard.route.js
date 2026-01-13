import express from "express"
import verifyUser from "../middleware/auth.middleware.js"
import { getSummary } from "../controllers/dashboard.controller.js"

const router = express.Router()

router.get('/summary', verifyUser, getSummary )


export default router;
