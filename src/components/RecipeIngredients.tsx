'use client';

import RestaurantMenuIcon from '@mui/icons-material/RestaurantMenu';
import {
  Box,
  Paper,
  Stack,
  ToggleButton,
  ToggleButtonGroup,
  Typography,
} from '@mui/material';
import type { Recipe } from '@/data/recipes';
import { useRecipeServings } from '@/components/RecipeServingsContext';

type RecipeIngredientsProps = {
  ingredientGroups: Recipe['ingredientGroups'];
};

export function RecipeIngredients({ ingredientGroups }: RecipeIngredientsProps) {
  const servings = useRecipeServings();
  const visibleIngredientGroups =
    servings?.scaledIngredientGroups ?? ingredientGroups;

  return (
    <Paper
      className='recipe-ingredients-card print-card'
      variant='outlined'
      sx={{ order: { xs: 3, md: 'initial' }, p: { xs: 2, md: 2.5 } }}
    >
      <Stack
        direction={{ xs: 'column', sm: 'row' }}
        spacing={1.25}
        alignItems={{ xs: 'stretch', sm: 'center' }}
        justifyContent='space-between'
        sx={{ mb: 1.5 }}
      >
        <Typography variant='h2' sx={{ fontSize: '1.25rem' }}>
          Składniki
        </Typography>

        {servings ? (
          <ToggleButtonGroup
            exclusive
            size='small'
            value={servings.targetServings}
            aria-label='Liczba porcji'
            onChange={(_, nextServings: number | null) => {
              if (nextServings) {
                servings.setTargetServings(nextServings);
              }
            }}
            sx={{
              alignSelf: { xs: 'flex-start', sm: 'center' },
              '& .MuiToggleButton-root': {
                minWidth: 42,
                px: 1,
              },
            }}
          >
            {servings.portionOptions.map((portionOption) => (
              <ToggleButton
                key={portionOption}
                value={portionOption}
                aria-label={`${portionOption} porcje`}
              >
                <RestaurantMenuIcon sx={{ mr: 0.5, fontSize: '1rem' }} />
                {portionOption}
              </ToggleButton>
            ))}
          </ToggleButtonGroup>
        ) : null}
      </Stack>

      <Stack spacing={visibleIngredientGroups.length > 1 ? 1.75 : 0}>
        {visibleIngredientGroups.map((group, groupIndex) => (
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
