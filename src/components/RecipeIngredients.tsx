'use client';

import { Box, Paper, Stack, Typography } from '@mui/material';
import type { Recipe } from '@/data/recipes';

type RecipeIngredientsProps = {
  ingredientGroups: Recipe['ingredientGroups'];
};

export function RecipeIngredients({ ingredientGroups }: RecipeIngredientsProps) {
  return (
    <Paper
      className='recipe-ingredients-card print-card'
      variant='outlined'
      sx={{ order: { xs: 3, md: 'initial' }, p: { xs: 2, md: 2.5 } }}
    >
      <Typography variant='h2' sx={{ fontSize: '1.25rem', mb: 2 }}>
        Składniki
      </Typography>

      <Stack spacing={ingredientGroups.length > 1 ? 1.75 : 0}>
        {ingredientGroups.map((group, groupIndex) => (
          <Box key={`${group.title}-${groupIndex}`}>
            {group.title ? (
              <Typography
                variant='h3'
                sx={{
                  fontSize: '0.96rem',
                  lineHeight: 1.2,
                  mb: 0.75,
                }}
              >
                {group.title}
              </Typography>
            ) : null}
            <Stack component='ul' spacing={0.75} sx={{ m: 0, pl: 2.5 }}>
              {group.items.map((ingredient, index) => (
                <Typography
                  component='li'
                  key={`${ingredient}-${index}`}
                  color='text.secondary'
                >
                  {ingredient}
                </Typography>
              ))}
            </Stack>
          </Box>
        ))}
      </Stack>
    </Paper>
  );
}
