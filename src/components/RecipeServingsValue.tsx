'use client';

import { useRecipeServings } from '@/components/RecipeServingsContext';

type RecipeServingsValueProps = {
  fallback: number | string;
};

export function RecipeServingsValue({ fallback }: RecipeServingsValueProps) {
  const servings = useRecipeServings();

  return servings?.targetServings ?? fallback;
}
