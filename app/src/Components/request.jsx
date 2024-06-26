const baseUrl = "http://localhost:8080";

export const auth = {
  login: `${baseUrl}/user/login`,
  google: `${baseUrl}/user/OAuth`,
  signup: `${baseUrl}/user/signup`,
  authenticate: `${baseUrl}/user/authenticate`,
  userDetails: `${baseUrl}/user/details/get_user_details`,
};

export const books = {
  allBooks: `${baseUrl}/books/allbooks`,
  romanceBooks: `${baseUrl}/books/getromance`,
  poetryBooks: `${baseUrl}/books/getpoetry`,
  flowerBooks: `${baseUrl}/books/getflower`,
  fantacyBooks: `${baseUrl}/books/getfantacy`,
  premiumBooks: `${baseUrl}/books/getpremium`,
  discoverBooks: `${baseUrl}/books/discover`,
  allBooksByCatagory: `${baseUrl}/books/books-by-cat`,
  getBookById: `${baseUrl}/books/getbookbyid`,
};

export const library = {
  addToCart: `${baseUrl}/library/cart`,
};
