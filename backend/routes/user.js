import express from 'express'
import { getAll, login, signup } from '../controllers/user-controller.js'

const router = express.Router()

router.get('/', getAll)
router.post('/signup', signup)
router.post('/login',login)

export default router