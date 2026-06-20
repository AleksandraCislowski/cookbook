import CasinoIcon from '@mui/icons-material/Casino';
import { Box, Button, Paper, Stack, Typography } from '@mui/material';
import { RecipeCard } from '@/components/RecipeCard';
import type { Recipe } from '@/data/recipes';

type RecipeResultsProps = {
  filteredRecipes: Recipe[];
  onPickRandomRecipe: () => void;
  onResetFilters: () => void;
};

export function RecipeResults({
  filteredRecipes,
  onPickRandomRecipe,
  onResetFilters,
}: RecipeResultsProps) {
  return (
    <Box>
      <Stack
        direction={{ xs: 'column', sm: 'row' }}
        spacing={1.5}
        alignItems={{ xs: 'stretch', sm: 'center' }}
        justifyContent='space-between'
        sx={{ mb: 2 }}
      >
        <Box>
          <Typography
            variant='h1'
            sx={{ fontSize: { xs: '1.45rem', md: '1.85rem' } }}
          >
            Przepisy gotowe do gotowania
          </Typography>
          <Typography color='text.secondary'>
            Pokazano {filteredRecipes.length} z Twojej biblioteki
          </Typography>
        </Box>
        <Button
          variant='contained'
          startIcon={<CasinoIcon />}
          disabled={filteredRecipes.length === 0}
          onClick={onPickRandomRecipe}
          sx={{ flexShrink: 0 }}
        >
          Losuj przepis
        </Button>
      </Stack>

      {filteredRecipes.length > 0 ? (
        <Box
          sx={{
            display: 'grid',
            gridTemplateColumns: {
              xs: '1fr',
              sm: 'repeat(2, minmax(0, 1fr))',
              xl: 'repeat(3, minmax(0, 1fr))',
            },
            gap: 2,
            gridAutoRows: '1fr',
          }}
        >
          {filteredRecipes.map((recipe) => (
            <RecipeCard key={recipe.slug} recipe={recipe} />
          ))}
        </Box>
      ) : (
        <Paper variant='outlined' sx={{ p: 4, textAlign: 'center' }}>
          <Typography variant='h2' sx={{ fontSize: '1.25rem' }}>
            Brak przepisów pasujących do wyszukiwania.
          </Typography>
          <Button sx={{ mt: 2 }} onClick={onResetFilters}>
            Pokaż wszystkie przepisy
          </Button>
        </Paper>
      )}
    </Box>
  );
}
