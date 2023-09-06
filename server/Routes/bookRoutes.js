import express from 'express'
import { getBooks, romanceBooks } from '../Controllers/bookContoller.js';

const router = express.Router()

router.get('/books',getBooks)
router.get('/getromance',romanceBooks)

export default router;