import express from "express";
import {
  discoverBooks,
  fantacyBooks,
  flowerBooks,
  getBooks,
  getBooksByID,
  getBooksWithCatagory,
  poetryBooks,
  premiumBooks,
  romanceBooks,
} from "../Controllers/bookContoller.js";

const router = express.Router();

router.get("/allbooks", getBooks);
router.get("/discover", discoverBooks);
router.get("/getromance", romanceBooks);
router.get("/getfantacy", fantacyBooks);
router.get("/getpoetry", poetryBooks);
router.get("/getflower", flowerBooks);
router.get("/getpremium", premiumBooks);
router.get("/books-by-cat", getBooksWithCatagory);
router.get("/getbookbyid/:bookId", getBooksByID);

export default router;
