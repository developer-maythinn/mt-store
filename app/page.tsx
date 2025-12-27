import { Box, Button } from "@mui/material";
import Image from "next/image";
import CustomCarousel from "./components/CustomCarousel";
import Categories from "./components/Categories/Categories";

export default function Home() {
  return (
    <>
      <Box>
        <CustomCarousel />
      </Box>

      <Categories />
    </>
  );
}
