import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getBooksByGenre } from "../features/BooksSlice";
import { useParams } from "react-router-dom";
import Nav from "../Components/Nav";
import Loader from "../Custom/Loader";
import { Grid, Paper, Typography } from "@mui/material";
import "../Style/Genere.css";

function Generes() {
  const dispatch = useDispatch();
  const { label } = useParams();
  const { loading, bookByGenre } = useSelector((state) => state.books);

  useEffect(() => {
    const req = {
      genre: label,
    };
    dispatch(getBooksByGenre(req));
  }, []);
  return (
    <>
      <Nav />
      <div className="mt-16">
        <Grid
          sx={{
            display: "flex",
            flexWrap: "wrap",
            margin: "7rem 0 0 4rem",
          }}
        >
          {bookByGenre?.books?.map((item, index) => (
            <Grid className="genere-container" key={index}>
              <Paper
                className="fadeInEffect"
                style={{
                  border: "1px solid lightGrey",
                  margin: "5px 8px 25px 1rem",
                }}
                elevation={2}
              >
                <Grid className="genere-books">
                  <img src={item.image} />
                </Grid>
                <Typography
                  variant="subtitle2"
                  sx={{
                    width: "12rem",
                    textAlign: "center",
                    padding: "0.5rem",
                  }}
                >
                  {item?.title?.length > 20
                    ? item?.title?.substring(0, 20) + "..."
                    : item?.title}
                </Typography>
              </Paper>
            </Grid>
          ))}
        </Grid>
      </div>
    </>
  );
}

export default Generes;
