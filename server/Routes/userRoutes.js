import express from 'express'
import { googleAuth, login, signup } from '../Controllers/userController.js';
import {authenticateToken} from '../Utils/Utils.js'

const router = express.Router()


router.post("/authenticate/:id",authenticateToken ,(req, res) => {
})
router.post('/signup', signup)
router.post('/login', login)
router.post('/OAuth/:clientId',googleAuth)

export default router;