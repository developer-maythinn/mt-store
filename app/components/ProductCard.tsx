// components/ProductCard.tsx
"use client";
import { Product } from "@/types/ecommerce";
import { useCartStore } from "@/store/useCartStore";
import { Card, CardContent, Typography, Button } from "@mui/material";
import Link from "next/link";

export default function ProductCard({ product }: { product: Product }) {
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
          onClick={() => addToCart(product, 1)}
        >
          Add to Cart
        </Button>
      </CardContent>
    </Card>
  );
}
