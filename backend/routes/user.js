import express from 'express'
import { getAll, login, signup, getUserById } from '../controllers/user-controller.js'

const router = express.Router()

router.get('/', getAll)
router.get("/:id", getUserById)
router.post('/signup', signup)
router.post('/login',login)

export default router