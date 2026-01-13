import express from "express"
import verifyUser from "../middleware/auth.middleware.js"
import { addSalary, getSalary } from "../controllers/salary.controller.js"

const router = express.Router()

router.post('/add', verifyUser, addSalary)
router.get('/:id/:role', verifyUser, getSalary)


export default router