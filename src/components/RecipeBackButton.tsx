'use client';

import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import { Button } from '@mui/material';
import { useRouter } from 'next/navigation';
import { requestHomeScrollRestore } from '@/utils/homeScroll';

export function RecipeBackButton() {
  const router = useRouter();

  function canGoBackToRecipeList() {
    if (!document.referrer) {
      return false;
    }

    const previousUrl = new URL(document.referrer);

    return (
      previousUrl.origin === location.origin &&
      previousUrl.pathname === '/'
    );
  }

  function goBackToRecipes() {
    requestHomeScrollRestore();

    if (canGoBackToRecipeList()) {
      router.back();
      return;
    }

    router.push('/');
  }

  return (
    <Button onClick={goBackToRecipes} startIcon={<ArrowBackIcon />}>
      Wróć do przepisów
    </Button>
  );
}
