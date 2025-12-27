"use client";

import { categories } from "@/dummyData/data";
import React, { useState } from "react";
import Category from "./Category";
import {
  Container,
  Grid,
  Box,
  CircularProgress,
  Typography,
} from "@mui/material";
import { grey } from "@mui/material/colors";
import ProductCard from "../ProductCard";
import { Product } from "@/types/ecommerce";
import { useQuery } from "@tanstack/react-query";
import { api } from "@/services/api";

function Categories() {
  const [selectedCategory, setSelectedCategory] = useState<string | null>(
    "beauty"
  );

  const { data: productsData, isLoading } = useQuery({
    queryKey: ["products", selectedCategory],
    queryFn: async () => {
      if (!selectedCategory) return { products: [] };
      return await api.getProductsByCategory(selectedCategory);
    },
    enabled: !!selectedCategory,
  });

  const products = (productsData?.products || []) as Product[];

  const handleCategoryClick = (slug: string) => {
    if (selectedCategory === slug) {
      setSelectedCategory(null);
      return;
    }
    setSelectedCategory(slug);
  };

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
                <Category
                  category={category}
                  index={index}
                  isSelected={selectedCategory === category.slug}
                  onCategoryClick={() => handleCategoryClick(category.slug)}
                />
              </React.Fragment>
            );
          })}
        </Grid>

        {selectedCategory && (
          <Box sx={{ py: 6, px: 4 }}>
            <Typography variant="h5" sx={{ mb: 4 }}>
              {categories.find((c) => c.slug === selectedCategory)?.name}
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
      </Container>
    </>
  );
}

export default Categories;
