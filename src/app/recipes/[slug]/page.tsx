import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import CalendarMonthIcon from '@mui/icons-material/CalendarMonth';
import HourglassBottomIcon from '@mui/icons-material/HourglassBottom';
import HourglassEmptyIcon from '@mui/icons-material/HourglassEmpty';
import KitchenIcon from '@mui/icons-material/Kitchen';
import RestaurantMenuIcon from '@mui/icons-material/RestaurantMenu';
import SoupKitchenIcon from '@mui/icons-material/SoupKitchen';
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
import { RecipeIngredients } from '@/components/RecipeIngredients';
import { RecipeServingsProvider } from '@/components/RecipeServingsContext';
import { RecipeServingsValue } from '@/components/RecipeServingsValue';
import { RecipeSpices } from '@/components/RecipeSpices';
import { getRecipeBySlug, getRecipeSlugs, type Recipe } from '@/data/recipes';
import { formatRecipeTime } from '@/utils/formatRecipeTime';
import {
  getBakingLabel,
  getPassiveTimeLabel,
  getTotalTime,
} from '@/utils/recipeDisplay';
import { getAbsoluteUrl, SITE_NAME } from '@/utils/site';

type RecipePageProps = {
  params: Promise<{
    slug: string;
  }>;
};

function getStatIcon(label: string) {
  if (label === 'Przygotowanie') {
    return <KitchenIcon fontSize='small' color='action' />;
  }

  if (label === 'Gotowanie') {
    return <SoupKitchenIcon fontSize='small' color='action' />;
  }

  if (label === 'Pieczenie') {
    return <ThermostatIcon fontSize='small' color='action' />;
  }

  if (label === 'Porcje') {
    return <RestaurantMenuIcon fontSize='small' color='action' />;
  }

  if (label === 'Czas pasywny') {
    return <HourglassBottomIcon fontSize='small' color='action' />;
  }

  if (label === 'Odpoczynek') {
    return <HourglassEmptyIcon fontSize='small' color='action' />;
  }

  if (label === 'Zacznij') {
    return <CalendarMonthIcon fontSize='small' color='action' />;
  }

  return <TimerOutlinedIcon fontSize='small' color='action' />;
}

function getIsoDuration(minutes?: number) {
  if (!minutes) {
    return undefined;
  }

  return `PT${minutes}M`;
}

function getRecipeJsonLd(recipe: Recipe) {
  const recipeUrl = getAbsoluteUrl(`/recipes/${recipe.slug}`);
  const totalTime = getTotalTime(recipe);

  return {
    '@context': 'https://schema.org',
    '@type': 'Recipe',
    name: recipe.title,
    description: recipe.description,
    image: [getAbsoluteUrl(recipe.image)],
    url: recipeUrl,
    datePublished: recipe.addedDate,
    recipeCategory: recipe.categories.join(', '),
    recipeCuisine: recipe.cuisine,
    recipeYield: recipe.servings ? `${recipe.servings} porcje` : undefined,
    prepTime: getIsoDuration(recipe.prepTime),
    cookTime: getIsoDuration((recipe.cookTime ?? 0) + (recipe.bakeTime ?? 0)),
    totalTime: getIsoDuration(totalTime),
    recipeIngredient: [...recipe.ingredients, ...recipe.spices],
    recipeInstructions: recipe.steps.map((step) => ({
      '@type': 'HowToStep',
      text: step,
    })),
  };
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
    title: recipe.title,
    description: recipe.description,
    alternates: {
      canonical: `/recipes/${recipe.slug}`,
    },
    openGraph: {
      title: recipe.title,
      description: recipe.description,
      url: `/recipes/${recipe.slug}`,
      siteName: SITE_NAME,
      locale: 'pl_PL',
      type: 'article',
      images: [
        {
          url: getAbsoluteUrl(recipe.image),
          width: 1200,
          height: 900,
          alt: `Zdjęcie dania: ${recipe.title}`,
        },
      ],
    },
    twitter: {
      card: 'summary_large_image',
      title: recipe.title,
      description: recipe.description,
      images: [getAbsoluteUrl(recipe.image)],
    },
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
  const recipeJsonLd = getRecipeJsonLd(recipe);
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
    <Box
      component='main'
      className='recipe-page'
      sx={{ minHeight: '100vh', pb: 6 }}
    >
      <script
        type='application/ld+json'
        dangerouslySetInnerHTML={{ __html: JSON.stringify(recipeJsonLd) }}
      />
      <Container maxWidth='lg' sx={{ pt: { xs: 2.5, md: 4 } }}>
        <RecipeServingsProvider
          baseServings={recipe.servings ?? 1}
          ingredientGroups={recipe.ingredientGroups}
          spiceGroups={recipe.spiceGroups}
        >
        <Stack
          className='no-print'
          direction='row'
          justifyContent='space-between'
          alignItems='center'
          spacing={1}
          sx={{ mb: 2 }}
        >
          <Button href='/' startIcon={<ArrowBackIcon />}>
            Wróć do przepisów
          </Button>
          <RecipeActions
            ingredientGroups={recipe.ingredientGroups}
            printTitle={recipe.title}
            spiceGroups={recipe.spiceGroups}
            steps={recipe.steps}
          />
        </Stack>

        <Box
          className='recipe-print'
          sx={{
            display: 'grid',
            gridTemplateColumns: { xs: '1fr', md: 'minmax(0, 1fr) 360px' },
            gap: { xs: 2.5, md: 3 },
            alignItems: 'start',
          }}
        >
          <Stack
            className='recipe-main'
            spacing={2.5}
            sx={{ display: { xs: 'contents', md: 'flex' } }}
          >
            <Paper
              className='recipe-image-card print-card'
              variant='outlined'
              sx={{ order: { xs: 2, md: 'initial' }, overflow: 'hidden' }}
            >
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
                  alt={`Zdjęcie dania: ${recipe.title}`}
                  sx={{
                    display: 'block',
                    height: '100%',
                    width: '100%',
                    objectFit: 'cover',
                  }}
                />
              </Box>
            </Paper>

            <Paper
              className='recipe-steps-card print-card'
              variant='outlined'
              sx={{ order: { xs: 5, md: 'initial' }, p: { xs: 2, md: 3 } }}
            >
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

          <Stack
            className='recipe-sidebar'
            spacing={2}
            sx={{
              display: { xs: 'contents', md: 'flex' },
              position: { md: 'sticky' },
              top: 120,
            }}
          >
            <Paper
              className='recipe-summary-card print-card'
              variant='outlined'
              sx={{ order: { xs: 1, md: 'initial' }, p: { xs: 2, md: 2.5 } }}
            >
              <Stack direction='row' flexWrap='wrap' gap={1} sx={{ mb: 1.5 }}>
                {recipe.categories.map((category) => (
                  <Chip
                    key={category}
                    size='small'
                    color='primary'
                    label={category}
                  />
                ))}
                <Chip size='small' variant='outlined' label={recipe.cuisine} />
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
                className='recipe-stats'
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
                          {label === 'Porcje' ? (
                            <RecipeServingsValue fallback={value} />
                          ) : (
                            value
                          )}
                        </Typography>
                      </Box>
                    </Box>
                  );
                })}
              </Box>
            </Paper>

            <RecipeIngredients ingredientGroups={recipe.ingredientGroups} />

            <RecipeSpices spiceGroups={recipe.spiceGroups} />

            {recipe.note ? (
              <Paper
                className='recipe-note-card print-card'
                variant='outlined'
                sx={{ order: { xs: 6, md: 'initial' }, p: 2, bgcolor: 'app.note' }}
              >
                <Typography variant='caption' color='text.secondary'>
                  Notatka
                </Typography>
                <Divider sx={{ my: 1 }} />
                <Typography>{recipe.note}</Typography>
              </Paper>
            ) : null}
          </Stack>
        </Box>
        </RecipeServingsProvider>
      </Container>
    </Box>
  );
}
