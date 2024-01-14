import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchDiscoveryBooks } from "../features/BooksSlice";
import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";
import Paper from "@mui/material/Paper";
import "../Style/Discover.css";
import { Typography, Button } from "@mui/material";

function Discover() {
  const selector = useSelector((state) => state.books.discoverBooks);
  const loading = useSelector((state) => state.books.loading);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchDiscoveryBooks());
  }, [dispatch]);
  return (
    <div>
      {loading ? (
        <Skeleton />
      ) : (
        <div>
          <Typography
            variant="h5"
            color="rgb(1, 33, 72)"
            sx={{ fontWeight: "600", margin: "2.5rem" }}
          >
            Discover Your Next Book
          </Typography>
          {selector && selector.books && selector.books.length > 0 && (
            <div className="discover-container">
              {selector.books.map((item, index) => (
                <Paper
                  key={index}
                  style={{
                    border: "1px solid lightGrey",
                    margin: "0 5rem 0 0",
                  }}
                  elevation={2}
                >
                  <div className="discover-books">
                    <img src={item.image} />
                    <div className="price-contaner">
                      <span>₹ {item.price}</span>
                      <span>
                        <Button
                          variant="contained"
                          sx={{ backgroundColor: "rgb(1, 33, 72)" }}
                        >
                          Buy
                        </Button>
                      </span>
                    </div>
                  </div>
                </Paper>
              ))}
            </div>
          )}
        </div>
      )}
    </div>
  );
}

export default Discover;
