import Nav from "./Nav";
import Discover from "./Discover";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchDiscoveryBooks } from "../features/BooksSlice";
import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";
import Paper from "@mui/material/Paper";
import Catagory from "./Catagory";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { Typography } from "@mui/material";
import Loader from "../Custom/Loader";

function Library() {
  const selector = useSelector((state) => state.books.discoverBooks);
  const loader = useSelector((state) => state.books.loading);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchDiscoveryBooks());
  }, [dispatch]);

  const settings = {
    dots: true,
    infinite: true,
    slidesToShow: 4,
    slidesToScroll: 1,
    autoplay: true,
    speed: 2000,
    autoplaySpeed: 2000,
    cssEase: "linear",
  };
  return (
    <div>
      {loader && <Loader visible={loader} />}
      {<Nav /> || <Skeleton />}
      <div className="mt-16 ">
        <div className="flex bg-slate-100">
          <div className="w-3/6 h-50 flex justify-center flex-col p-10">
            <div className="text-5xl font-semibold ">What to read next?</div>
            <p className="text-zinc-400 font-semibold pt-6">
              You're in the right place. Select books of your choice and
              starting reading!
            </p>
          </div>

          <div className="flex justify-center items-center h-50 p-10 pl-20">
            <Paper elevation={2}>
              <img
                src="http://books.google.com/books/content?id=Wi7yDwAAQBAJ&printsec=frontcover&img=1&zoom=1&source=gbs_api"
                height="150px"
                width="150px"
              />
            </Paper>
            <Paper elevation={2}>
              <img
                src="http://books.google.com/books/content?id=nB5gEAAAQBAJ&printsec=frontcover&img=1&zoom=1&edge=curl&source=gbs_api"
                height="160px"
                width="160px"
                className="z-10"
              />
            </Paper>
            <Paper elevation={2}>
              <img
                src="http://books.google.com/books/content?id=qYr5zgEACAAJ&printsec=frontcover&img=1&zoom=1&source=gbs_api"
                height="150px"
                width="150px"
              />
            </Paper>
          </div>
        </div>

        {selector && selector.books && selector.books.length > 0 ? (
          <>
            <Typography
              variant="h5"
              color="rgb(1, 33, 72)"
              sx={{ fontWeight: "600", margin: "2.5rem" }}
            >
              Discover Your Next Book
            </Typography>
            <Slider {...settings}>
              {selector.books.map((item, index) => (
                <Discover item={item} key={index} />
              ))}
            </Slider>
          </>
        ) : (
          <></>
        )}
        <Catagory />
      </div>
    </div>
  );
}

export default Library;
