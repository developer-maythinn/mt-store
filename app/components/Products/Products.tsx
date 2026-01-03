"use client";
import { useCategories } from "@/hooks/useCategories";
import { useCategoryStore } from "@/store/useCategoryStore";
import React from "react";
import {
  Container,
  Grid,
  Box,
  CircularProgress,
  Typography,
  Skeleton,
} from "@mui/material";
import { useQuery } from "@tanstack/react-query";
import { api } from "@/services/api";
import { CategoryType, Product } from "@/types/ecommerce";
import ProductCard from "../ProductCard";
import { useProductsByCategory } from "@/hooks/useProductsByCategory";

function Products() {
  const { selectedCategory } = useCategoryStore();
  const {
    data: categories,
    isError,
    isLoading: categoriesLoading,
  } = useCategories();

 
  const { data: productsData, isLoading } = useProductsByCategory();
  const products = (productsData?.products || []) as Product[];

  return (
    <>
      {selectedCategory && (
        <Box sx={{ py: 6 }}>
          <Typography variant="h5" sx={{ mb: 4 }}>
            {
              categories?.find((c: CategoryType) => c.slug === selectedCategory)
                ?.name
            }
          </Typography>

          {isLoading ? (
            <Box sx={{ display: "flex", justifyContent: "center", py: 4 }}>
              <CircularProgress />
            </Box>
          ) : products.length > 0 ? (
            <Grid container spacing={2}>
              {products.map((product) => (
                <Grid size={{ xs: 12, sm: 6, md: 4, lg: 3 }} key={product.id}>
                  <ProductCard product={product} />
                </Grid>
              ))}
            </Grid>
          ) : (
            <Typography color="textSecondary">
              No products found for this category.
            </Typography>
          )}
        </Box>
      )}
    </>
  );
}

export default Products;
