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
  isSelected?: boolean;
  onCategoryClick?: () => void;
}

function Category({
  category,
  index,
  isSelected = false,
  onCategoryClick,
}: CategoryProps) {
  let isLastChild = categories.length - 1 === index;
  const isActive = isSelected;
  return (
    <>
      <Grid
        size={2}
        onClick={onCategoryClick}
        sx={{
          textAlign: "center",
          py: 6,
          background: isActive ? "green" : "#fff",
          color: isActive ? "#fff" : "#000",
          position: "relative",
          cursor: "pointer",
          transition: "all 0.3s ease",
          "&:hover": {
            background: isActive ? "green" : "#f5f5f5",
          },
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
