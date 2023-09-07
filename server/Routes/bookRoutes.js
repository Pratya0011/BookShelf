import express from 'express'
import { fantacyBooks, flowerBooks, getBooks, poetryBooks, premiumBooks, romanceBooks } from '../Controllers/bookContoller.js';

const router = express.Router()

router.get('/allbooks',getBooks)
router.get('/getromance',romanceBooks)
router.get('/getfantacy', fantacyBooks)
router.get('/getpoetry', poetryBooks)
router.get('/getflower', flowerBooks)
router.get('/getpremium', premiumBooks)

export default router;