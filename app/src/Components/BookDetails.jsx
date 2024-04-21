import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { get } from "../Custom/useApi";
import { books } from "./request";
import Loader from "../Custom/Loader";
import Nav from "./Nav";
import {
  Grid,
  Typography,
  Paper,
  Box,
  Button,
  Divider,
  Stack,
} from "@mui/material";
import "../Style/BookDetails.css";
import RatingIcon from "../Utils/RatingIcon";

function BookDetails() {
  const [loading, setLoading] = useState(false);
  const [book, setBook] = useState({});
  const { bookId } = useParams();

  useEffect(() => {
    setLoading(true);
    get(books.getBookById, {}, bookId, {})
      .then((res) => {
        setBook(res.data.book);
      })
      .catch((error) => {
        console.log(error);
      })
      .finally(() => setLoading(false));
  }, [bookId]);

  if (loading) {
    return <Loader visible={loading} />;
  }
  return (
    <>
      <Nav />
      <Grid>
        <Grid className="mt-20" display="flex" gap={2}>
          <Grid className="image-container">
            <Paper
              elevation="1"
              style={{
                height: "100%",
                width: "100%",
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
              }}
            >
              <img src={book.image} />
            </Paper>
          </Grid>
          <Grid
            sx={{
              width: "70vw",
              display: "flex",
              flexDirection: "column",
              justifyContent: "center",
              gap: 3,
            }}
          >
            <Typography variant="h4">{book.title}</Typography>
            <Typography variant="subtitle2">by {book.author}</Typography>
            <Grid display="flex" gap={3}>
              <Box display="flex" gap={1}>
                <Box>
                  <RatingIcon stars={book.ratings_count} size={20} />
                </Box>
                <Typography>{book.ratings_count}</Typography>
              </Box>
              <Typography>{book.want_to_read} Want to read</Typography>
              <Typography>
                {book.currentle_reading} Currently reading
              </Typography>
              <Typography>{book.have_read} Have read</Typography>
            </Grid>
            <Grid display="flex" alignItems="center" gap={3}>
              <Button color="primary" variant="outlined">
                want to read
              </Button>
              <Button color="primary" variant="contained">
                start Reading
              </Button>
            </Grid>
            <Grid>
              <Typography variant="subtitle2">{book.description}</Typography>
            </Grid>
          </Grid>
        </Grid>
        <Divider fullWidth sx={{ marginTop: 4 }} />
        <Grid mt={3} ml={10} display="flex" direction="column" gap={1}>
          <Box display="flex" gap={20}>
            <Typography variant="h5">
              Ratings and Reviews ({book.ratings})
            </Typography>
            <Button color="primary" variant="outlined">
              Add rating & review
            </Button>
          </Box>
          <Box>
            <RatingIcon stars={book.ratings_count} size={30} />
          </Box>
          {books.comments && book.comments.length > 0 ? (
            <Box>
              {book.comments.map((item, index) => (
                <Stack key={index}>{item.comment}</Stack>
              ))}
            </Box>
          ) : (
            <Typography variant="h6">No reviews</Typography>
          )}
        </Grid>
      </Grid>
    </>
  );
}

export default BookDetails;
