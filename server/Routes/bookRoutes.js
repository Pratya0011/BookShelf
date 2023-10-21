import express from 'express'
import { discoverBooks, fantacyBooks, flowerBooks, getBooks, poetryBooks, premiumBooks, romanceBooks } from '../Controllers/bookContoller.js';

const router = express.Router()

router.get('/allbooks',getBooks)
router.get('/discover', discoverBooks)
router.get('/getromance',romanceBooks)
router.get('/getfantacy', fantacyBooks)
router.get('/getpoetry', poetryBooks)
router.get('/getflower', flowerBooks)
router.get('/getpremium', premiumBooks)

export default router;