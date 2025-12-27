// app/category/[slug]/page.tsx
"use client";
import { useQuery } from "@tanstack/react-query";
import { Grid, Container, Typography } from "@mui/material";
import { useParams } from "next/navigation";
import { api } from "@/services/api";
import ProductCard from "@/app/components/ProductCard";

export default function CategoryProducts() {
  const params = useParams();
  const slug = typeof params?.slug === "string" ? params.slug : "";

  const { data, isLoading } = useQuery({
    queryKey: ["products", slug],
    queryFn: () => api.getProductsByCategory(slug),
    enabled: slug.length > 0,
  });

  if (isLoading) return <Typography>Loading...</Typography>;

  return (
    <Container>
      <Typography
        variant="h4"
        sx={{ my: 4, textTransform: "capitalize", fontWeight: "bold" }}
      >
        {slug.replace("-", " ")}
      </Typography>

      <Grid container spacing={3}>
        {data?.products.map((product: any) => (
          <Grid size={{ xs: 12, sm: 6, md: 4 }} key={product.id}>
            <ProductCard product={product} />
          </Grid>
        ))}
      </Grid>
    </Container>
  );
}
