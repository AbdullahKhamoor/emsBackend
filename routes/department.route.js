import express from "express"
import verifyUser from "../middleware/auth.middleware.js"
import { addDepartment, getDepartments, getDepartment, updateDepartment, deleteDepartment } from "../controllers/department.controller.js"

const router = express.Router()

router.get('/', verifyUser, getDepartments)
router.post('/add', verifyUser, addDepartment)
router.get('/:id', verifyUser, getDepartment)
router.put('/:id', verifyUser, updateDepartment)
router.delete('/:id', verifyUser, deleteDepartment)


export default router