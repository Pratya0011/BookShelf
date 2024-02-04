import { useSelector } from "react-redux";
import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";
import Paper from "@mui/material/Paper";
import "../Style/Discover.css";
import { Button } from "@mui/material";

function Discover({ item }) {
  const loading = useSelector((state) => state.books.loading);

  return (
    <div>
      {loading ? (
        <Skeleton />
      ) : (
        <div>
          <div className="discover-container">
            <Paper
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
          </div>
        </div>
      )}
    </div>
  );
}

export default Discover;
