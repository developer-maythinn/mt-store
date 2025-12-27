// components/CategoryNav.tsx
'use client';
import { useQuery } from '@tanstack/react-query';
import { Box, Button, Skeleton, Stack } from '@mui/material';
import Link from 'next/link';
import { api } from '@/services/api';

export default function CategoryNav() {
  const { data: categories, isLoading } = useQuery({
    queryKey: ['categories'],
    queryFn: api.getCategories, // Clean and reusable
  });

  if (isLoading) return <Skeleton variant="rectangular" height={50} />;

  // Limiting to 6 categories as requested
  const displayCategories = categories?.slice(0, 6);

  return (
    <Stack direction="row" spacing={2} sx={{ overflowX: 'auto', py: 2 }}>
      {displayCategories?.map((cat: string) => (
        <Link key={cat} href={`/category/${cat}`} passHref>
          <Button variant="outlined" sx={{ whiteSpace: 'nowrap' }}>
            {cat.replace('-', ' ')}
          </Button>
        </Link>
      ))}
    </Stack>
  );
}