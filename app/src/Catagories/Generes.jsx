import React, { useEffect } from "react";
import { useDispatch } from "react-redux";
import { getBooksByGenre } from "../features/BooksSlice";
import { useParams } from "react-router-dom";

function Generes() {
  const dispatch = useDispatch();
  const { label } = useParams();

  useEffect(() => {
    const req = {
      genre: label,
    };
    dispatch(getBooksByGenre(req));
  }, [dispatch, label]);
  return <div>Generes</div>;
}

export default Generes;
