"use client";
import {
  Container,
  Typography,
  Stack,
  IconButton,
  Box,
  Divider,
  Button,
} from "@mui/material";
import AddIcon from "@mui/icons-material/Add";
import RemoveIcon from "@mui/icons-material/Remove";
import DeleteOutlineIcon from "@mui/icons-material/DeleteOutline";
import { useCartStore } from "@/store/useCartStore";

export default function CheckoutPage() {
  const { cart, updateQuantity, removeFromCart, clearCart } = useCartStore();
  const totalPrice = cart.reduce(
    (acc, item) => acc + item.price * item.quantity,
    0
  );

  if (cart.length === 0) {
    return (
      <Container sx={{ py: 10, textAlign: "center" }}>
        <Typography variant="h5">Your cart is empty.</Typography>
        <Button href="/" sx={{ mt: 2 }}>
          Go Shopping
        </Button>
      </Container>
    );
  }

  return (
    <Container sx={{ py: 4 }}>
      <Typography variant="h4" gutterBottom>
        Your Cart
      </Typography>
      <Stack spacing={2}>
       
        {cart.map((item) => {
          // Calculate item total
          const itemTotal = item.price * item.quantity;

          return (
            <Box
              key={item.id}
              sx={{
                display: "flex",
                alignItems: "center",
                justifyContent: "space-between",
                p: 2,
                borderBottom: "1px solid #eee",
              }}
            >
              <Box sx={{ flex: 1 }}>
                <Typography variant="subtitle1" fontWeight="bold">
                  {item.title}
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  Unit Price: ${item.price.toFixed(2)}
                </Typography>
              </Box>

              {/* Quantity Controls */}
              <Stack
                direction="row"
                alignItems="center"
                spacing={1}
                sx={{ mx: 2 }}
              >
                <IconButton
                  size="small"
                  onClick={() => updateQuantity(item.id, "dec")}
                >
                  <RemoveIcon fontSize="small" />
                </IconButton>
                <Typography sx={{ minWidth: "20px", textAlign: "center" }}>
                  {item.quantity}
                </Typography>
                <IconButton
                  size="small"
                  onClick={() => updateQuantity(item.id, "inc")}
                >
                  <AddIcon fontSize="small" />
                </IconButton>
              </Stack>

              {/* Item Total Price */}
              <Box sx={{ minWidth: "100px", textAlign: "right" }}>
                <Typography
                  variant="subtitle1"
                  fontWeight="bold"
                  color="primary"
                >
                  ${itemTotal.toFixed(2)}
                </Typography>
              </Box>

              <IconButton
                color="error"
                onClick={() => removeFromCart(item.id)}
                sx={{ ml: 1 }}
              >
                <DeleteOutlineIcon />
              </IconButton>
            </Box>
          );
        })}
      </Stack>

      <Box sx={{ mt: 4, textAlign: "right" }}>
        <Typography variant="h5">Total: ${totalPrice.toFixed(2)}</Typography>
        <Button
          variant="contained"
          size="large"
          sx={{ mt: 2 }}
          onClick={() => {
            alert("Order Success!");
            clearCart();
          }}
        >
          Pay Now
        </Button>
      </Box>
    </Container>
  );
}
