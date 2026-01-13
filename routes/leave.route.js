import express from "express"
import verifyUser from "../middleware/auth.middleware.js"
import { addLeave, getLeave, getLeaves, getLeaveDetail, updateLeave } from "../controllers/leave.controller.js"

const router = express.Router()

router.post('/add', verifyUser, addLeave)
router.get('/detail/:id', verifyUser, getLeaveDetail)
router.get('/:id/:role', verifyUser, getLeave)
router.get('/', verifyUser, getLeaves )
router.put('/:id', verifyUser, updateLeave)
 

export default router