export const base_url = "http://localhost:8080";

export const sortBooks = (books, bookType, limit) => {
  const filteredBooks = books
    ?.filter((item) => item?.bookType === bookType)
    .slice(0, limit);
  return { label: bookType, books: filteredBooks, count: filteredBooks.length };
};
