import content from "../model/content.js";
import { sortBooks } from "../Utils/helper.js";

export const getBooks = async (req, res) => {
  const { genre } = req.query;
  try {
    if (genre) {
      const books = await content.find({ bookType: genre });
      res.status(200).send({
        booksCount: books.length,
        books,
      });
    } else {
      const books = await content.find();
      res.status(200).send({
        booksCount: books.length,
        books,
      });
    }
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
    const romance = sortBooks(books, "romance", 8);
    const fantasy = sortBooks(books, "fantasy", 8);
    const poetry = sortBooks(books, "poetry", 8);
    const flower = sortBooks(books, "flower", 8);

    const resData = {
      booksCount: books.length,
      catagoryCount: 5,
      results: [romance, fantasy, poetry, flower],
    };
    if (req.locals.accessToken) {
      res.header("Authorization", `Bearer ${req.locals.accessToken}`);
    }
    res.status(200).send(resData);
  } catch (error) {
    return res.status(500).send({ message: "Internal server Error" });
  }
};

export const getBooksByID = async (req, res) => {
  const bookId = req.params.bookId;

  try {
    if (!bookId) {
      res.status(400).send({
        error: "Invalid book id",
        message: "Could not fetch book details",
      });
    } else {
      const book = await content.findById(bookId);
      if (!book) {
        res.status(400).send({
          error: "no book with the given id",
          message: "Could not fetch book details",
        });
      } else {
        res.status(200).send({
          book: book,
        });
      }
    }
  } catch (error) {
    res.status(500).send({
      message: "Internal server error",
    });
  }
};
