import { useEffect } from "react";
import Nav from "./Nav";
import { useDispatch, useSelector } from "react-redux";
import Loader from "../Custom/Loader";
import { fetchPremiumBooks } from "../features/BooksSlice";
import { Button, Grid, Paper } from "@mui/material";
import "../Style/Premium.css";
import { useNavigate } from "react-router-dom";

function Premium() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const loading = useSelector((state) => state.books.loading);
  const premiumBooks = useSelector((state) => state.books.premiumBooks);

  useEffect(() => {
    dispatch(fetchPremiumBooks());
  }, [dispatch]);

  const viewBookDetailsHandler = (id) => {
    navigate(`/book/${id}`);
  };
  return (
    <div>
      <Nav />
      <Grid className="mt-20" sx={{ display: "flex", flexWrap: "wrap" }}>
        <Loader visible={loading} />
        {premiumBooks?.books?.length > 0 &&
          premiumBooks?.books?.map((item, index) => (
            <Grid
              key={index}
              className="discover-container"
              onClick={() => viewBookDetailsHandler(item?._id)}
            >
              <Paper
                style={{
                  border: "1px solid lightGrey",
                  margin: "0 1.5rem 0 2.5rem",
                }}
                elevation={2}
              >
                <Grid className="discover-books">
                  <img src={item.image} />
                  <Grid className="price-contaner">
                    <span>₹ {item.price}</span>
                    <span>
                      <Button
                        variant="outlined"
                        sx={{ color: "rgb(1, 33, 72)" }}
                      >
                        Buy Now
                      </Button>
                    </span>
                  </Grid>
                </Grid>
              </Paper>
            </Grid>
          ))}
      </Grid>
    </div>
  );
}

export default Premium;
