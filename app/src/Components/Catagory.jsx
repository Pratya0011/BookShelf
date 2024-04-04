import { Box, Tab, Tabs, Typography } from "@mui/material";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import DynamicCatagoryMapper from "../Catagories/DynamicCatagoryMapper";
import { fetchAllByCatagory } from "../features/BooksSlice";

function Catagory() {
  const [value, setValue] = useState(0);
  const dispatch = useDispatch();
  const allBooksByCatagory =
    useSelector((state) => state.books.allBooksByCatagory) || null;
  console.log(allBooksByCatagory);
  useEffect(() => {
    dispatch(fetchAllByCatagory());
  }, [dispatch]);
  function TabPanel(props) {
    const { children, value, index, ...other } = props;

    return (
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
    <Box
      sx={{
        flexGrow: 1,
        bgcolor: "background.paper",
        display: "flex",
        height: "fit-content",
        marginTop: "2rem",
      }}
    >
      <Tabs
        orientation="vertical"
        variant="scrollable"
        value={value}
        onChange={handleChange}
        aria-label="Vertical tabs example"
        sx={{ borderRight: 1, borderColor: "divider", width: "15vw" }}
      >
        {allBooksByCatagory &&
          allBooksByCatagory?.results?.length > 0 &&
          allBooksByCatagory?.results?.map((item, index) => (
            <Tab label={item?.label} key={index} {...a11yProps(index)} />
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
  );
}

export default Catagory;
