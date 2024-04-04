export const sortBooks = (books, bookType) => {
  const filteredBooks = books?.filter((item) => item?.bookType === bookType);
  return { label: bookType, books: filteredBooks, count: filteredBooks.length };
};
