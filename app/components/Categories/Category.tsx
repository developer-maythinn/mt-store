import { categories, categoriesImages } from "@/dummyData/data";
import { Grid, Typography } from "@mui/material";
import { grey } from "@mui/material/colors";
import Image from "next/image";
import React from "react";

type CategoryType = {
  name: string;
  slug: string;
};

interface CategoryProps {
  category: CategoryType;
  index: number;
}
function Category({ category, index }: CategoryProps) {
  let isLastChild = categories.length - 1 === index;
  console.log(isLastChild);
  const isActive = index === 0;
  return (
    <>
      <Grid
        size={2}
        sx={{
          textAlign: "center",
          py: 6,
          background: isActive ? "green" : "#fff",
          color: isActive ? "#fff" : "#000",
          position: "relative",
          "&::before": {
            content: "''",
            width: "1px",
            height: "100px",
            position: "absolute",
            top: "37px",
            right: 0,
            background: isLastChild
              ? "trasparent"
              : isActive
              ? "green"
              : grey[300],
          },
          "&::after": {
            content: "''",
            position: "absolute",
            bottom: "-40px",
            left: 0,
            border: "20px solid transparent",
            borderTopColor: isActive ? "green" : "transparent",
            right: 0,
            margin: "auto",
            width: 0,
          },
        }}
      >
        <Image
          src={categoriesImages[index]}
          alt="img"
          width={500}
          height={500}
          className="w-10 mx-auto"
        />
        <Typography variant="subtitle1" sx={{ mt: 1 }}>
          {category.name}
        </Typography>
      </Grid>
    </>
  );
}

export default Category;
