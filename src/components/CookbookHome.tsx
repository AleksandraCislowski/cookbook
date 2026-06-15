'use client';

import { useMemo, useState } from 'react';
import CasinoIcon from '@mui/icons-material/Casino';
import FilterListIcon from '@mui/icons-material/FilterList';
import RestartAltIcon from '@mui/icons-material/RestartAlt';
import SearchIcon from '@mui/icons-material/Search';
import {
  Box,
  Button,
  Chip,
  Container,
  FormControl,
  InputAdornment,
  InputLabel,
  MenuItem,
  Paper,
  Select,
  Stack,
  TextField,
  Typography,
} from '@mui/material';
import { alpha } from '@mui/material/styles';
import { RandomRecipeDialog } from '@/components/RandomRecipeDialog';
import { RecipeCard } from '@/components/RecipeCard';
import { RECIPE_LOGO_SRC } from '@/components/RecipeImage';
import type { Recipe } from '@/data/recipes';
import { getTotalTime } from '@/utils/recipeDisplay';

const ALL = 'all';
const QUICK_RECIPE_MAX_TIME = 30;

function matchesSearch(recipe: Recipe, searchTerm: string) {
  const normalizedSearch = searchTerm.trim().toLowerCase();

  if (!normalizedSearch) {
    return true;
  }

  return [
    recipe.title,
    recipe.description,
    recipe.category,
    recipe.cuisine,
    recipe.difficulty,
    ...recipe.tags,
    ...recipe.ingredients,
    ...recipe.spices,
  ]
    .join(' ')
    .toLowerCase()
    .includes(normalizedSearch);
}

export function CookbookHome({ recipes }: { recipes: Recipe[] }) {
  const categoryOptions = useMemo(
    () => [
      ALL,
      ...Array.from(new Set(recipes.map((recipe) => recipe.category))),
    ],
    [recipes],
  );
  const tagOptions = useMemo(
    () => Array.from(new Set(recipes.flatMap((recipe) => recipe.tags))),
    [recipes],
  );
  const [searchTerm, setSearchTerm] = useState('');
  const [category, setCategory] = useState(ALL);
  const [activeTag, setActiveTag] = useState(ALL);
  const [randomRecipe, setRandomRecipe] = useState<Recipe | null>(null);
  const [sort, setSort] = useState('newest');
  const hasActiveFilters =
    searchTerm !== '' ||
    category !== ALL ||
    activeTag !== ALL ||
    sort !== 'newest';

  const filteredRecipes = useMemo(() => {
    return recipes
      .filter((recipe) => category === ALL || recipe.category === category)
      .filter((recipe) => activeTag === ALL || recipe.tags.includes(activeTag))
      .filter((recipe) => matchesSearch(recipe, searchTerm))
      .sort((firstRecipe, secondRecipe) => {
        if (sort === 'fastest') {
          const firstTime =
            getTotalTime(firstRecipe) || Number.POSITIVE_INFINITY;
          const secondTime =
            getTotalTime(secondRecipe) || Number.POSITIVE_INFINITY;

          return firstTime - secondTime;
        }

        if (sort === 'title') {
          return firstRecipe.title.localeCompare(secondRecipe.title);
        }

        return secondRecipe.addedDate.localeCompare(firstRecipe.addedDate);
      });
  }, [activeTag, category, recipes, searchTerm, sort]);

  const stats = [
    { label: 'Przepisy', value: recipes.length },
    {
      label: 'Szybkie dania',
      value: recipes.filter((recipe) => {
        const totalTime = getTotalTime(recipe);

        return (
          totalTime > 0 &&
          totalTime <= QUICK_RECIPE_MAX_TIME &&
          !recipe.advanceNotice
        );
      }).length,
    },
    { label: 'Kategorie', value: categoryOptions.length - 1 },
  ];

  function resetFilters() {
    setSearchTerm('');
    setCategory(ALL);
    setActiveTag(ALL);
    setSort('newest');
  }

  function pickRandomRecipe() {
    if (filteredRecipes.length === 0) {
      return;
    }

    let nextRecipe =
      filteredRecipes[Math.floor(Math.random() * filteredRecipes.length)];

    if (filteredRecipes.length > 1) {
      while (nextRecipe.slug === randomRecipe?.slug) {
        nextRecipe =
          filteredRecipes[Math.floor(Math.random() * filteredRecipes.length)];
      }
    }

    setRandomRecipe(nextRecipe);
  }

  return (
    <Box sx={{ minHeight: '100vh', pb: 6 }}>
      <Box
        component='header'
        sx={{
          borderBottom: '1px solid',
          borderColor: 'app.border',
          backgroundColor: (theme) =>
            alpha(theme.palette.background.paper, 0.9),
          backdropFilter: 'blur(18px)',
          overflow: 'visible',
        }}
      >
        <Container maxWidth='xl' sx={{ position: 'relative' }}>
          <Stack
            direction='row'
            spacing={{ xs: 1, md: 1.75 }}
            alignItems='center'
            justifyContent='space-between'
            sx={{
              minHeight: { xs: 70, sm: 82, md: 96 },
              py: { xs: 0.75, md: 1 },
            }}
          >
            <Stack
              direction='row'
              spacing={{ xs: 0.75, sm: 1.25 }}
              alignItems='center'
              sx={{ minWidth: 0 }}
            >
              <Box
                sx={{
                  position: 'relative',
                  width: { xs: 72, sm: 96, md: 132 },
                  height: { xs: 58, sm: 72, md: 84 },
                  flexShrink: 0,
                }}
              >
                <Box
                  component='img'
                  src={RECIPE_LOGO_SRC}
                  alt='Logo domowej książki kucharskiej'
                  sx={{
                    position: 'absolute',
                    top: { xs: -16, sm: -22, md: -32 },
                    left: 0,
                    width: { xs: 72, sm: 96, md: 132 },
                    height: { xs: 92, sm: 124, md: 166 },
                    display: 'block',
                    objectFit: 'contain',
                  }}
                />
              </Box>
              <Box sx={{ minWidth: 0 }}>
                <Typography
                  variant='h1'
                  sx={{
                    fontSize: { xs: '1.05rem', sm: '1.25rem', md: '1.55rem' },
                    lineHeight: { xs: 1, sm: 1.05 },
                    overflowWrap: 'anywhere',
                  }}
                >
                  Kącik Kulinarny Aleksandry
                </Typography>
                <Typography
                  variant='body2'
                  color='text.secondary'
                  sx={{
                    display: { xs: 'none', sm: 'block' },
                    lineHeight: 1.25,
                  }}
                >
                  Prywatna książka kucharska z przepisami, zdjęciami i
                  notatkami.
                </Typography>
              </Box>
            </Stack>
          </Stack>
        </Container>
      </Box>

      <Container maxWidth='xl' sx={{ pt: { xs: 3, md: 4 } }}>
        <Box
          sx={{
            display: 'grid',
            gridTemplateColumns: {
              xs: '1fr',
              lg: '280px minmax(0, 1fr)',
            },
            gap: 2.5,
            alignItems: 'start',
          }}
        >
          <Stack spacing={2}>
            <Paper
              variant='outlined'
              sx={{ p: 2, bgcolor: 'background.paper' }}
            >
              <Stack
                direction='row'
                spacing={1}
                alignItems='center'
                sx={{ mb: 2 }}
              >
                <FilterListIcon color='primary' />
                <Typography variant='h2' sx={{ fontSize: '1rem' }}>
                  Przeglądaj
                </Typography>
              </Stack>
              <Stack spacing={2}>
                <TextField
                  value={searchTerm}
                  onChange={(event) => setSearchTerm(event.target.value)}
                  label='Szukaj przepisów'
                  placeholder='miso, cytryna, obiad...'
                  size='small'
                  InputProps={{
                    startAdornment: (
                      <InputAdornment position='start'>
                        <SearchIcon fontSize='small' />
                      </InputAdornment>
                    ),
                  }}
                />
                <FormControl size='small' fullWidth>
                  <InputLabel id='category-filter-label'>Kategoria</InputLabel>
                  <Select
                    labelId='category-filter-label'
                    value={category}
                    label='Kategoria'
                    onChange={(event) => setCategory(event.target.value)}
                  >
                    {categoryOptions.map((option) => (
                      <MenuItem key={option} value={option}>
                        {option === ALL ? 'Wszystkie kategorie' : option}
                      </MenuItem>
                    ))}
                  </Select>
                </FormControl>
                <FormControl size='small' fullWidth>
                  <InputLabel id='sort-label'>Sortowanie</InputLabel>
                  <Select
                    labelId='sort-label'
                    value={sort}
                    label='Sortowanie'
                    onChange={(event) => setSort(event.target.value)}
                  >
                    <MenuItem value='newest'>Najnowsze</MenuItem>
                    <MenuItem value='fastest'>Najszybsze</MenuItem>
                    <MenuItem value='title'>Tytuł A-Z</MenuItem>
                  </Select>
                </FormControl>
                <Button
                  variant='outlined'
                  startIcon={<RestartAltIcon />}
                  disabled={!hasActiveFilters}
                  onClick={resetFilters}
                >
                  Resetuj filtry
                </Button>
              </Stack>
            </Paper>

            <Paper
              variant='outlined'
              sx={{ p: 2, bgcolor: 'background.paper' }}
            >
              <Typography variant='h2' sx={{ fontSize: '1rem', mb: 1.5 }}>
                Tagi
              </Typography>
              <Stack direction='row' flexWrap='wrap' gap={1}>
                <Chip
                  label='wszystkie'
                  color={activeTag === ALL ? 'primary' : 'default'}
                  onClick={() => setActiveTag(ALL)}
                />
                {tagOptions.map((tag) => (
                  <Chip
                    key={tag}
                    label={tag}
                    color={activeTag === tag ? 'primary' : 'default'}
                    variant={activeTag === tag ? 'filled' : 'outlined'}
                    onClick={() => setActiveTag(tag)}
                  />
                ))}
              </Stack>
            </Paper>

            <Paper variant='outlined' sx={{ p: 2, bgcolor: 'app.surface' }}>
              <Typography variant='h2' sx={{ fontSize: '1rem', mb: 1.5 }}>
                Biblioteka
              </Typography>
              <Stack spacing={1.25}>
                {stats.map((stat) => (
                  <Stack
                    key={stat.label}
                    direction='row'
                    justifyContent='space-between'
                  >
                    <Typography color='text.secondary'>{stat.label}</Typography>
                    <Typography fontWeight={800}>{stat.value}</Typography>
                  </Stack>
                ))}
              </Stack>
            </Paper>
          </Stack>

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
                  variant='h2'
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
                onClick={pickRandomRecipe}
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
                <Button sx={{ mt: 2 }} onClick={resetFilters}>
                  Pokaż wszystkie przepisy
                </Button>
              </Paper>
            )}
          </Box>
        </Box>
      </Container>

      <RandomRecipeDialog
        recipe={randomRecipe}
        onClose={() => setRandomRecipe(null)}
        onPickAgain={pickRandomRecipe}
      />
    </Box>
  );
}
