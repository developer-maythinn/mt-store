import { Box, Button, Container } from "@mui/material";
import Image from "next/image";
import CustomCarousel from "./components/CustomCarousel";
import Categories from "./components/Categories/Categories";
import Products from "./components/Products/Products";

export default function Home() {
  return (
    <>
      <Box>
        <CustomCarousel />
      </Box>

      <Categories />
      <Container maxWidth="lg">
        <Products />
      </Container>
    </>
  );
}
