import express from 'express'
import { googleAuth, login, signup } from '../Controllers/userController.js';

const router = express.Router()

router.post('/signup', signup)
router.post('/login', login)
router.post('/OAuth/:clientId',googleAuth)

export default router;