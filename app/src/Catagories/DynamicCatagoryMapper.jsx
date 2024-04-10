import { Box, Grid, Paper, Typography } from "@mui/material";
import React from "react";
import "../Style/Genere.css";
import { useNavigate } from "react-router-dom";

function DynamicCatagoryMapper({ books }) {
  const navigate = useNavigate();

  const viewAllHandler = (label) => {
    navigate(`/${label}`);
  };
  return (
    <>
      <Box
        sx={{
          width: "85%",
          marginBottom: "1rem",
          display: "flex",
          justifyContent: "flex-end",
          cursor: "pointer",
        }}
      >
        <Typography
          sx={{
            "&:hover": {
              color: "blue",
            },
          }}
          onClick={() => viewAllHandler(books?.label)}
        >
          view all
        </Typography>
      </Box>
      <Grid sx={{ display: "flex", flexWrap: "wrap" }}>
        {books?.books?.map((item, index) => (
          <Grid className="genere-container" key={index}>
            <Paper
              style={{
                border: "1px solid lightGrey",
                margin: "0 5rem 0 0",
              }}
              elevation={2}
            >
              <Grid className="genere-books">
                <img src={item.image} />
              </Grid>
              <Typography
                variant="subtitle2"
                sx={{ width: "12rem", textAlign: "center", padding: "0.5rem" }}
              >
                {item?.title?.length > 20
                  ? item?.title?.substring(0, 20) + "..."
                  : item?.title}
              </Typography>
            </Paper>
          </Grid>
        ))}
      </Grid>
    </>
  );
}

export default DynamicCatagoryMapper;
