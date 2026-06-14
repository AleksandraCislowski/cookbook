import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import CalendarMonthIcon from '@mui/icons-material/CalendarMonth';
import HourglassBottomIcon from '@mui/icons-material/HourglassBottom';
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
import { RecipeActions } from '@/components/RecipeActions';
import { getRecipeBySlug, getRecipeSlugs, type Recipe } from '@/data/recipes';
import { formatRecipeTime } from '@/utils/formatRecipeTime';

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

function getBakingLabel(recipe: Recipe) {
  if (!recipe.bakeTime && !recipe.bakeTemperature) {
    return null;
  }

  return [
    recipe.bakeTemperature,
    recipe.bakeTime ? formatRecipeTime(recipe.bakeTime) : '',
  ]
    .filter(Boolean)
    .join(' / ');
}

function getPassiveTimeLabel(recipe: Recipe) {
  const timeLabel = recipe.passiveTime
    ? formatRecipeTime(recipe.passiveTime)
    : '';

  if (timeLabel && recipe.passiveTimeLabel) {
    return `${timeLabel} · ${recipe.passiveTimeLabel}`;
  }

  if (timeLabel) {
    return timeLabel;
  }

  return recipe.passiveTimeLabel;
}

function getTotalTime(recipe: Recipe) {
  return (
    (recipe.prepTime ?? 0) +
    (recipe.cookTime ?? 0) +
    (recipe.bakeTime ?? 0) +
    (recipe.restTime ?? 0)
  );
}

function getStatIcon(label: string) {
  if (label === 'Pieczenie') {
    return <ThermostatIcon fontSize='small' color='action' />;
  }

  if (label === 'Porcje') {
    return <RestaurantMenuIcon fontSize='small' color='action' />;
  }

  if (label === 'Czas pasywny') {
    return <HourglassBottomIcon fontSize='small' color='action' />;
  }

  if (label === 'Zacznij') {
    return <CalendarMonthIcon fontSize='small' color='action' />;
  }

  return <TimerOutlinedIcon fontSize='small' color='action' />;
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
  const passiveTimeLabel = getPassiveTimeLabel(recipe);
  const recipeStats = [
    totalTime ? ['Razem', formatRecipeTime(totalTime)] : null,
    recipe.prepTime
      ? ['Przygotowanie', formatRecipeTime(recipe.prepTime)]
      : null,
    recipe.cookTime ? ['Gotowanie', formatRecipeTime(recipe.cookTime)] : null,
    bakingLabel ? ['Pieczenie', bakingLabel] : null,
    recipe.restTime
      ? ['Odpoczynek', formatRecipeTime(recipe.restTime)]
      : null,
    passiveTimeLabel ? ['Czas pasywny', passiveTimeLabel] : null,
    recipe.advanceNotice ? ['Zacznij', recipe.advanceNotice] : null,
    recipe.servings ? ['Porcje', recipe.servings] : null,
  ].filter((stat): stat is [string, string | number] => Boolean(stat));

  return (
    <Box sx={{ minHeight: '100vh', pb: 6 }}>
      <Container maxWidth='lg' sx={{ pt: { xs: 2.5, md: 4 } }}>
        <Stack
          direction='row'
          justifyContent='space-between'
          alignItems='center'
          spacing={1}
          sx={{ mb: 2 }}
        >
          <Button href='/' startIcon={<ArrowBackIcon />}>
            Wróć do przepisów
          </Button>
          <RecipeActions />
        </Stack>

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
                  gridTemplateColumns: 'repeat(2, minmax(0, 1fr))',
                  gap: 1.25,
                  mt: 2.5,
                }}
              >
                {recipeStats.map(([label, value]) => {
                  const wideStat =
                    label === 'Czas pasywny' || label === 'Zacznij';

                  return (
                    <Box
                      key={label}
                      sx={{
                        display: 'flex',
                        gridColumn: wideStat ? '1 / -1' : 'auto',
                        minHeight: wideStat ? 82 : 92,
                        minWidth: 0,
                        width: '100%',
                        flexDirection: 'column',
                        alignItems: 'center',
                        justifyContent: 'center',
                        px: { xs: 1.75, sm: 2 },
                        py: 1.6,
                        bgcolor: 'app.surface',
                        borderRadius: 2,
                        textAlign: 'center',
                        overflow: 'hidden',
                      }}
                    >
                      <Stack
                        direction='row'
                        spacing={0.5}
                        alignItems='center'
                        justifyContent='center'
                        sx={{
                          minWidth: 0,
                          maxWidth: '100%',
                          color: 'text.secondary',
                          mb: 0.8,
                        }}
                      >
                        {getStatIcon(label)}
                        <Typography
                          variant='caption'
                          color='text.secondary'
                          sx={{
                            display: 'block',
                            lineHeight: 1.1,
                            overflowWrap: 'break-word',
                          }}
                        >
                          {label}:
                        </Typography>
                      </Stack>
                      <Box
                        sx={{
                          minWidth: 0,
                          width: '100%',
                          maxWidth: wideStat ? 280 : 128,
                        }}
                      >
                        <Typography
                          fontWeight={650}
                          sx={{
                            fontSize: '0.92rem',
                            lineHeight: 1.28,
                            overflowWrap: 'break-word',
                          }}
                        >
                          {value}
                        </Typography>
                      </Box>
                    </Box>
                  );
                })}
              </Box>
            </Paper>

            <Paper variant='outlined' sx={{ p: { xs: 2, md: 2.5 } }}>
              <Typography variant='h2' sx={{ fontSize: '1.25rem', mb: 1.5 }}>
                Składniki
              </Typography>
              <Stack spacing={recipe.ingredientGroups.length > 1 ? 1.75 : 0}>
                {recipe.ingredientGroups.map((group, groupIndex) => (
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
                    <Stack
                      component='ul'
                      spacing={0.75}
                      sx={{ m: 0, pl: 2.5 }}
                    >
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

            {recipe.spices.length > 0 ? (
              <Paper variant='outlined' sx={{ p: { xs: 2, md: 2.5 } }}>
                <Typography variant='h2' sx={{ fontSize: '1.25rem', mb: 1.5 }}>
                  Przyprawy
                </Typography>
                <Stack component='ul' spacing={0.75} sx={{ m: 0, pl: 2.5 }}>
                  {recipe.spices.map((spice, index) => (
                    <Typography
                      component='li'
                      key={`${spice}-${index}`}
                      color='text.secondary'
                    >
                      {spice}
                    </Typography>
                  ))}
                </Stack>
              </Paper>
            ) : null}

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
