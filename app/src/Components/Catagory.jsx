import { Box, Tab, Tabs, Typography } from "@mui/material";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import DynamicCatagoryMapper from "../Catagories/DynamicCatagoryMapper";
import { fetchAllByCatagory } from "../features/BooksSlice";
import Loader from "../Custom/Loader";

function Catagory() {
  const [value, setValue] = useState(0);
  const dispatch = useDispatch();
  const { allBooksByCatagory, loading } =
    useSelector((state) => state.books) || null;
  const loader = useSelector((state) => state.books.loading);

  useEffect(() => {
    dispatch(fetchAllByCatagory());
  }, [dispatch]);

  function TabPanel(props) {
    const { children, value, index, ...other } = props;

    return (
      <>
        <div
          role="tabpanel"
          hidden={value !== index}
          id={`vertical-tabpanel-${index}`}
          aria-labelledby={`vertical-tab-${index}`}
          {...other}
        >
          {value === index && (
            <Box sx={{ p: 3 }}>
              <Typography>{children}</Typography>
            </Box>
          )}
        </div>
      </>
    );
  }

  function a11yProps(index) {
    return {
      id: `vertical-tab-${index}`,
      "aria-controls": `vertical-tabpanel-${index}`,
    };
  }

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };
  return (
    <>
      {loader && <Loader visible={loader} />}
      <Typography
        variant="h6"
        sx={{
          height: "1.5rem",
          mt: 4,
          pt: 1,
          pl: 8,
          fontWeight: "600",
          bgcolor: "rgb(59 130 246 / 0.03)",
          color: "rgb(1, 33, 72)",
        }}
      >
        Genere
      </Typography>
      <Box
        sx={{
          flexGrow: 1,
          bgcolor: "rgb(59 130 246 / 0.05)",
          display: "flex",
          height: "fit-content",
        }}
      >
        <Tabs
          orientation="vertical"
          TabIndicatorProps={{
            sx: {
              bgcolor: "rgb(59 130 246 / 0.5)",
              height: "10px",
            },
          }}
          variant="scrollable"
          value={value}
          onChange={handleChange}
          aria-label="Vertical tabs example"
          sx={{
            borderRight: 1,
            borderColor: "divider",
            width: "25vw",
            marginTop: "3rem",
            color: "rgb(1, 33, 72)",
          }}
        >
          {allBooksByCatagory &&
            allBooksByCatagory?.results?.length > 0 &&
            allBooksByCatagory?.results?.map((item, index) => (
              <Tab
                label={item?.label}
                key={index}
                {...a11yProps(index)}
                sx={{ height: "4rem", color: "rgb(1, 33, 72)" }}
              />
            ))}
        </Tabs>
        {allBooksByCatagory &&
          allBooksByCatagory?.results?.length > 0 &&
          allBooksByCatagory?.results?.map((item, index) => (
            <TabPanel index={index} key={index} value={value}>
              <DynamicCatagoryMapper books={item} />
            </TabPanel>
          ))}
      </Box>
      {<Loader visible={loading} />}
    </>
  );
}

export default Catagory;
