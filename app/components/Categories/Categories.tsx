import { categories } from "@/dummyData/data";
import React from "react";
import Category from "./Category";
import { Container, Grid } from "@mui/material";
import { grey } from "@mui/material/colors";

function Categories() {
  return (
    <>
      <Container
        maxWidth="lg"
        sx={{
          border: `1px solid ${grey[300]}`,
          my: 10,
          "&.MuiContainer-root": {
            px: 0,
          },
        }}
      >
        <Grid container>
          {categories.map((category, index) => {
            return (
              <React.Fragment key={index}>
                <Category category={category} index={index} />
              </React.Fragment>
            );
          })}
        </Grid>
      </Container>
    </>
  );
}

export default Categories;
