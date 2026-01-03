"use client";

import { useQuery } from "@tanstack/react-query";
import { useParams } from "next/navigation";
import { api } from "@/services/api";
import { useCartStore } from "@/store/useCartStore";
import {
  Container,
  Grid,
  Typography,
  Button,
  Box,
  Stack,
  IconButton,
  Chip,
  Divider,
  Skeleton,
} from "@mui/material";
import AddIcon from "@mui/icons-material/Add";
import RemoveIcon from "@mui/icons-material/Remove";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import { useState } from "react";
import { useProductById } from "@/hooks/useProductById";

export default function ProductDetailPage() {
  const params = useParams();
  const id = typeof params?.id === "string" ? params.id : "";
  const [localQty, setLocalQty] = useState<number>(1);
  const addToCart = useCartStore((state) => state.addToCart);

  // const {
  //   data: product,
  //   isLoading,
  //   error,
  // } = useQuery({
  //   queryKey: ["product", id],
  //   queryFn: () => api.getProductById(id),
  //   enabled: !!id,
  // });
  const { data: product, isLoading, error } = useProductById(id);

  if (isLoading) return <LoadingSkeleton />;
  if (error || !product)
    return <Typography color="error">Product not found.</Typography>;

  return (
    <Container sx={{ py: 8 }}>
      <Grid container spacing={6}>
        {/* Left Side: Image */}
        <Grid>
          <Box
            sx={{
              bgcolor: "#f5f5f5",
              borderRadius: 4,
              p: 4,
              textAlign: "center",
              display: "flex",
              alignItems: "center",
              height: 400,
            }}
          >
            <img
              src={product.thumbnail}
              alt={product.title}
              style={{ width: "100%", maxHeight: "100%", objectFit: "contain" }}
            />
          </Box>
        </Grid>

        {/* Right Side: Info */}
        <Grid size={{ xs: 12, md: 6 }}>
          <Chip
            label={product.category}
            sx={{ mb: 2, textTransform: "capitalize" }}
          />
          <Typography variant="h3" fontWeight="bold" gutterBottom>
            {product.title}
          </Typography>

          <Typography variant="h4" color="primary" sx={{ mb: 3 }}>
            ${product.price}
          </Typography>

          <Divider sx={{ mb: 3 }} />

          {/* Quantity and Actions */}
          <Stack spacing={3}>
            <Stack direction="row" alignItems="center" spacing={2}>
              <Typography variant="subtitle1" fontWeight="bold">
                Quantity:
              </Typography>
              <Stack
                direction="row"
                alignItems="center"
                sx={{ border: "1px solid #ddd", borderRadius: 2 }}
              >
                <IconButton
                  onClick={() => setLocalQty((q) => Math.max(1, q - 1))}
                >
                  <RemoveIcon />
                </IconButton>
                <Typography sx={{ width: 40, textAlign: "center" }}>
                  {localQty}
                </Typography>
                <IconButton onClick={() => setLocalQty((q) => q + 1)}>
                  <AddIcon />
                </IconButton>
              </Stack>
            </Stack>

            <Button
              variant="contained"
              size="large"
              startIcon={<ShoppingCartIcon />}
              onClick={() => addToCart(product, localQty)}
              sx={{ py: 2, borderRadius: 2, fontSize: "1.1rem" }}
            >
              Add {localQty} to Cart — ${(product.price * localQty).toFixed(2)}
            </Button>
          </Stack>
        </Grid>
      </Grid>
    </Container>
  );
}

// Simple Skeleton Loader
function LoadingSkeleton() {
  return (
    <Container sx={{ py: 8 }}>
      <Grid container spacing={6}>
        <Grid size={{ xs: 12, md: 6 }}>
          <Skeleton variant="rectangular" height={400} />
        </Grid>
        <Grid size={{ xs: 12, md: 6 }}>
          <Skeleton width="60%" height={60} />
          <Skeleton width="40%" height={40} />
          <Skeleton variant="rectangular" height={100} sx={{ mt: 4 }} />
        </Grid>
      </Grid>
    </Container>
  );
}
