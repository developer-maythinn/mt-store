"use client";
import React, { useState } from "react";
import Category from "./Category";
import {
  Container,
  Grid,
  Box,
  CircularProgress,
  Typography,
  Skeleton,
} from "@mui/material";
import { grey } from "@mui/material/colors";
import ProductCard from "../ProductCard";
import { CategoryType, Product } from "@/types/ecommerce";
import { useQuery } from "@tanstack/react-query";
import { api } from "@/services/api";
import { useCategoryStore } from "@/store/useCategoryStore";
import { useCategories } from "@/hooks/useCategories";

function Categories() {
  const { selectedCategory } = useCategoryStore();
  const {
    data: categories,
    isError,
    isLoading: categoriesLoading,
  } = useCategories();

  const { data: productsData, isLoading } = useQuery({
    queryKey: ["products", selectedCategory],
    queryFn: async () => {
      if (!selectedCategory) return { products: [] };
      return await api.getProductsByCategory(selectedCategory);
    },
    enabled: !!selectedCategory,
  });

  const products = (productsData?.products || []) as Product[];

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
        {categoriesLoading ? (
          <Skeleton variant="rectangular" height={4} />
        ) : (
          <Grid container>
            {categories
              ?.slice(0, 6)
              .map((category: CategoryType, index: number) => {
                return (
                  <React.Fragment key={index}>
                    <Category
                      category={category}
                      index={index}
                      isSelected={selectedCategory === category.slug}
                    />
                  </React.Fragment>
                );
              })}
          </Grid>
        )}
      </Container>
     
    </>
  );
}

export default Categories;
