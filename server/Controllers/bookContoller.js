import content from "../model/content.js";
import { sortBooks } from "../Utils/helper.js";

export const getBooks = async (req, res) => {
  const page = parseInt(req.query.page) || 1;
  const limit = 10;
  const skip = (page - 1) * limit;
  try {
    const books = await content.find().skip(skip).limit(limit);
    res.status(200).send({
      books,
      booksCount: books.length,
    });
  } catch (err) {
    res.status(500).send({
      message: "Internal server error",
    });
  }
};

export const romanceBooks = async (req, res) => {
  try {
    const books = await content.find({ bookType: "romance" });
    if (!books) {
      return res.status(404).send({ message: "No Books Found" });
    } else {
      return res.status(200).send({
        books,
        booksCount: books.length,
      });
    }
  } catch (err) {
    return res.status(500).send({ message: "Internal server error" });
  }
};

export const fantacyBooks = async (req, res) => {
  try {
    const books = await content.find({ bookType: "fantasy" });
    if (!books) {
      return res.status(404).send({ message: "No books found" });
    } else {
      return res.status(200).send({
        books,
        booksCount: books.length,
      });
    }
  } catch (err) {
    return res.status(500).send({ message: "internal Server Error" });
  }
};

export const flowerBooks = async (req, res) => {
  try {
    const books = await content.find({ bookType: "flower" });
    if (!books) {
      return res.status(404).send({ message: "no book found" });
    } else {
      return res.status(200).send({
        books,
        booksCount: books.length,
      });
    }
  } catch (err) {
    return res.status(500).send({ message: "internal Server Error" });
  }
};

export const poetryBooks = async (req, res) => {
  try {
    const books = await content.find({ bookType: "poetry" });
    if (!books) {
      return res.status(404).send({ message: "no book found" });
    } else {
      return res.status(200).send({
        books,
        booksCount: books.length,
      });
    }
  } catch (err) {
    return res.status(500).send({ message: "internal Server Error" });
  }
};

export const premiumBooks = async (req, res) => {
  try {
    const books = await content.find({ bookType: "mostpopular" });
    if (!books) {
      return res.status(404).send({ message: "no book found" });
    } else {
      return res.status(200).send({
        books,
        booksCount: books.length,
      });
    }
  } catch (err) {
    return res.status(500).send({ message: "internal Server Error" });
  }
};

export const discoverBooks = async (req, res) => {
  try {
    const books = await content.find({ bookType: "mostpopular" }).limit(5);
    if (!books) {
      return res.status(404).send({ message: "No books found" });
    } else {
      const response = {
        books,
        bookType: books.length,
      };
      if (req.locals.accessToken) {
        res.header("Authorization", `Bearer ${req.locals.accessToken}`);
      }
      return res.status(200).send(response);
    }
  } catch (err) {
    return res.status(500).send({ message: "Internal server Error" });
  }
};

export const getBooksWithCatagory = async (req, res) => {
  try {
    const books = await content.find();
    const romance = sortBooks(books, "romance");
    const fantasy = sortBooks(books, "fantasy");
    const poetry = sortBooks(books, "poetry");
    const flower = sortBooks(books, "flower");
    const mostpopular = sortBooks(books, "mostpopular");

    const resData = {
      booksCount: books.length,
      catagoryCount: 5,
      results: [romance, fantasy, poetry, flower, mostpopular],
    };
    if (req.locals.accessToken) {
      res.header("Authorization", `Bearer ${req.locals.accessToken}`);
    }
    res.status(200).send(resData);
  } catch (error) {
    console.log(error);
    return res.status(500).send({ message: "Internal server Error" });
  }
};
