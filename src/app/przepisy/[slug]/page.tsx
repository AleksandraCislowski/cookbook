import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import RestaurantMenuIcon from '@mui/icons-material/RestaurantMenu';
import ThermostatIcon from '@mui/icons-material/Thermostat';
import TimerOutlinedIcon from '@mui/icons-material/TimerOutlined';
import {
  Box,
  Button,
  Chip,
  Container,
  Divider,
  Paper,
  Stack,
  Typography,
} from '@mui/material';
import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import {
  getRecipeBySlug,
  getRecipeSlugs,
  type Recipe,
} from '@/data/recipes';

type RecipePageProps = {
  params: Promise<{
    slug: string;
  }>;
};

const difficultyLabels: Record<Recipe['difficulty'], string> = {
  easy: 'łatwe',
  medium: 'średnie',
  slow: 'powolne',
};

function getTotalTime(recipe: Recipe) {
  return (
    (recipe.prepTime ?? 0) +
    (recipe.cookTime ?? 0) +
    (recipe.bakeTime ?? 0) +
    (recipe.restTime ?? 0)
  );
}

function getBakingLabel(recipe: Recipe) {
  if (!recipe.bakeTime && !recipe.bakeTemperature) {
    return null;
  }

  return [recipe.bakeTemperature, recipe.bakeTime ? `${recipe.bakeTime} min` : '']
    .filter(Boolean)
    .join(' / ');
}

export function generateStaticParams() {
  return getRecipeSlugs().map((slug) => ({ slug }));
}

export async function generateMetadata({
  params,
}: RecipePageProps): Promise<Metadata> {
  const { slug } = await params;
  const recipe = getRecipeBySlug(slug);

  if (!recipe) {
    return {
      title: 'Nie znaleziono przepisu',
    };
  }

  return {
    title: `${recipe.title} | Kącik Kulinarny Aleksandry`,
    description: recipe.description,
  };
}

export default async function RecipePage({ params }: RecipePageProps) {
  const { slug } = await params;
  const recipe = getRecipeBySlug(slug);

  if (!recipe) {
    notFound();
  }

  const bakingLabel = getBakingLabel(recipe);
  const totalTime = getTotalTime(recipe);
  const recipeStats = [
    recipe.prepTime ? ['Przygotowanie', `${recipe.prepTime} min`] : null,
    recipe.cookTime ? ['Gotowanie', `${recipe.cookTime} min`] : null,
    bakingLabel ? ['Pieczenie', bakingLabel] : null,
    recipe.restTime ? ['Odpoczynek', `${recipe.restTime} min`] : null,
    recipe.servings ? ['Porcje', recipe.servings] : null,
  ].filter((stat): stat is [string, string | number] => Boolean(stat));

  return (
    <Box sx={{ minHeight: '100vh', pb: 6 }}>
      <Container maxWidth='lg' sx={{ pt: { xs: 2.5, md: 4 } }}>
        <Button
          href='/'
          startIcon={<ArrowBackIcon />}
          sx={{ mb: 2 }}
        >
          Wróć do przepisów
        </Button>

        <Box
          sx={{
            display: 'grid',
            gridTemplateColumns: { xs: '1fr', md: 'minmax(0, 1fr) 360px' },
            gap: { xs: 2.5, md: 3 },
            alignItems: 'start',
          }}
        >
          <Stack spacing={2.5}>
            <Paper variant='outlined' sx={{ overflow: 'hidden' }}>
              <Box
                sx={{
                  position: 'relative',
                  width: '100%',
                  aspectRatio: '4 / 3',
                  overflow: 'hidden',
                  bgcolor: 'app.imageFallback',
                  lineHeight: 0,
                }}
              >
                <Box
                  component='img'
                  src={recipe.image}
                  alt=''
                  sx={{
                    display: 'block',
                    height: '100%',
                    width: '100%',
                    objectFit: 'cover',
                  }}
                />
              </Box>
            </Paper>

            <Paper variant='outlined' sx={{ p: { xs: 2, md: 3 } }}>
              <Typography variant='h2' sx={{ fontSize: '1.35rem', mb: 2 }}>
                Przygotowanie
              </Typography>
              <Stack component='ol' spacing={1.5} sx={{ m: 0, pl: 2.5 }}>
                {recipe.steps.map((step, index) => (
                  <Typography
                    component='li'
                    key={`${step}-${index}`}
                    color='text.secondary'
                    sx={{ pl: 0.5 }}
                  >
                    {step}
                  </Typography>
                ))}
              </Stack>
            </Paper>
          </Stack>

          <Stack spacing={2} sx={{ position: { md: 'sticky' }, top: 120 }}>
            <Paper variant='outlined' sx={{ p: { xs: 2, md: 2.5 } }}>
              <Stack direction='row' flexWrap='wrap' gap={1} sx={{ mb: 1.5 }}>
                <Chip size='small' color='primary' label={recipe.category} />
                <Chip size='small' variant='outlined' label={recipe.cuisine} />
                <Chip
                  size='small'
                  variant='outlined'
                  label={difficultyLabels[recipe.difficulty]}
                />
              </Stack>

              <Typography
                variant='h1'
                sx={{ fontSize: { xs: '2rem', md: '2.6rem' }, lineHeight: 1 }}
              >
                {recipe.title}
              </Typography>
              <Typography color='text.secondary' sx={{ mt: 1.5 }}>
                {recipe.description}
              </Typography>

              <Box
                sx={{
                  display: 'grid',
                  gridTemplateColumns: 'repeat(3, minmax(0, 1fr))',
                  gap: 1,
                  mt: 2.5,
                }}
              >
                {recipeStats.map(([label, value]) => (
                  <Box
                    key={label}
                    sx={{
                      minWidth: 0,
                      p: 1,
                      bgcolor: 'app.surface',
                      borderRadius: 2,
                    }}
                  >
                    <Typography variant='caption' color='text.secondary'>
                      {label}
                    </Typography>
                    <Typography fontWeight={800}>{value}</Typography>
                  </Box>
                ))}
              </Box>

              <Stack direction='row' flexWrap='wrap' gap={1.5} sx={{ mt: 2 }}>
                {totalTime > 0 ? (
                  <Stack direction='row' spacing={0.5} alignItems='center'>
                    <TimerOutlinedIcon fontSize='small' color='action' />
                    <Typography variant='body2'>
                      {totalTime} min razem
                    </Typography>
                  </Stack>
                ) : null}
                {recipe.servings ? (
                  <Stack direction='row' spacing={0.5} alignItems='center'>
                    <RestaurantMenuIcon fontSize='small' color='action' />
                    <Typography variant='body2'>
                      {recipe.servings} porcje
                    </Typography>
                  </Stack>
                ) : null}
                {bakingLabel ? (
                  <Stack direction='row' spacing={0.5} alignItems='center'>
                    <ThermostatIcon fontSize='small' color='action' />
                    <Typography variant='body2'>{bakingLabel}</Typography>
                  </Stack>
                ) : null}
              </Stack>
            </Paper>

            <Paper variant='outlined' sx={{ p: { xs: 2, md: 2.5 } }}>
              <Typography variant='h2' sx={{ fontSize: '1.25rem', mb: 1.5 }}>
                Składniki
              </Typography>
              <Stack component='ul' spacing={0.75} sx={{ m: 0, pl: 2.5 }}>
                {recipe.ingredients.map((ingredient, index) => (
                  <Typography
                    component='li'
                    key={`${ingredient}-${index}`}
                    color='text.secondary'
                  >
                    {ingredient}
                  </Typography>
                ))}
              </Stack>
            </Paper>

            {recipe.note ? (
              <Paper variant='outlined' sx={{ p: 2, bgcolor: 'app.note' }}>
                <Typography variant='caption' color='text.secondary'>
                  Notatka
                </Typography>
                <Divider sx={{ my: 1 }} />
                <Typography>{recipe.note}</Typography>
              </Paper>
            ) : null}
          </Stack>
        </Box>
      </Container>
    </Box>
  );
}
