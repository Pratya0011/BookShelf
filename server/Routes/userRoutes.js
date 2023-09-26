import express from 'express'
import { googleAuth, login, signup } from '../Controllers/userController.js';
import {authenticateToken} from '../Utils/Utils.js'
import { currentlyReading } from '../Controllers/myLibrary.js';

const router = express.Router()


router.post("/authenticate/:id",authenticateToken ,(req, res) => {
})
router.post('/signup', signup)
router.post('/login', login)
router.post('/OAuth/:clientId',googleAuth)
router.patch('/currentlyreading/:id',currentlyReading)

export default router;