import { useQuery } from "@tanstack/react-query";
import axios from "axios";

const BASE_URL = process.env.NEXT_PUBLIC_BASE_URL;

export const useProductById = (id: string) => {
  return useQuery({
    queryKey: ["product", id],
    queryFn: async () => {
      const response = await axios.get(`${BASE_URL}/products/${id}`);
      return response.data;
    },
    // refetchOnWindowFocus: false, // Window focus ဖြစ်ရင် ပြန်မခေါ်ခိုင်းတော့ဘူး
    staleTime: 300000, // ၅ မိနစ်အတွင်း API ထပ်မခေါ်ဘူး 1000 * 60 * 5
  });
};
