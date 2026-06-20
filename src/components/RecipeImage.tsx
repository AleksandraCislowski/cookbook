'use client';

import { useEffect, useState } from 'react';
import { Box } from '@mui/material';
import type { Recipe } from '@/data/recipes';

export const RECIPE_LOGO_SRC = '/images/recipes/logo.png';

export function RecipeImage({
  alt,
  recipe,
}: {
  alt?: string;
  recipe: Recipe;
}) {
  const [imageSource, setImageSource] = useState(recipe.image);

  useEffect(() => {
    setImageSource(recipe.image);
  }, [recipe.image]);

  return (
    <Box
      sx={{
        position: 'relative',
        width: '100%',
        aspectRatio: '4 / 3',
        overflow: 'hidden',
        backgroundColor: 'app.imageFallback',
        lineHeight: 0,
      }}
    >
      <Box
        component='img'
        src={imageSource}
        alt={alt ?? `Zdjęcie dania: ${recipe.title}`}
        draggable={false}
        onError={() => {
          if (imageSource !== RECIPE_LOGO_SRC) {
            setImageSource(RECIPE_LOGO_SRC);
          }
        }}
        sx={{
          display: 'block',
          position: 'absolute',
          inset: 0,
          width: '100%',
          height: '100%',
          objectFit: 'contain',
        }}
      />
    </Box>
  );
}
