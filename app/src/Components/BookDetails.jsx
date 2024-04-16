import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { get } from "../Custom/useApi";
import { books } from "./request";
import Loader from "../Custom/Loader";

function BookDetails() {
  const [loading, setLoading] = useState(false);
  const { bookId } = useParams();

  useEffect(() => {
    setLoading(true);
    get(books.getBookById, {}, bookId, {})
      .then((res) => {
        console.log(res);
      })
      .catch((error) => {
        console.log(error);
      })
      .finally(() => setLoading(false));
  }, [bookId]);

  if (loading) {
    return <Loader visible={loading} />;
  }
  return <div>BookDetails</div>;
}

export default BookDetails;
