// components/ProductCard.tsx
"use client";
import { useState } from "react";
import { Product } from "@/types/ecommerce";
import { useCartStore } from "@/store/useCartStore";
import {
  Card,
  CardContent,
  Typography,
  Button,
  Stack,
  IconButton,
  Box,
} from "@mui/material";
import AddIcon from "@mui/icons-material/Add";
import RemoveIcon from "@mui/icons-material/Remove";
import Link from "next/link";

export default function ProductCard({ product }: { product: Product }) {
  const [localQty, setLocalQty] = useState<number>(1);
  const addToCart = useCartStore((state) => state.addToCart);

  return (
    <Card sx={{ p: 2 }}>
      <Link href={`/product/${product.id}`}>
        <img
          src={product.thumbnail}
          alt={product.title}
          style={{ width: "100%", height: 150, objectFit: "contain" }}
        />
      </Link>
      <CardContent>
        <Typography variant="h6" noWrap>
          {product.title}
        </Typography>
        <Typography color="primary">${product.price}</Typography>

        <Button
          variant="contained"
          fullWidth
          onClick={() => addToCart(product, localQty)}
        >
          Add to Cart
        </Button>
      </CardContent>
    </Card>
  );
}
