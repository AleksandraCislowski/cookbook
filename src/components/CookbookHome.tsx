'use client';

import { useMemo, useState } from 'react';
import AddIcon from '@mui/icons-material/Add';
import CloseIcon from '@mui/icons-material/Close';
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';
import FilterListIcon from '@mui/icons-material/FilterList';
import LocalGroceryStoreIcon from '@mui/icons-material/LocalGroceryStore';
import PrintIcon from '@mui/icons-material/Print';
import RestaurantMenuIcon from '@mui/icons-material/RestaurantMenu';
import SearchIcon from '@mui/icons-material/Search';
import TimerOutlinedIcon from '@mui/icons-material/TimerOutlined';
import {
  Box,
  Button,
  Card,
  CardActionArea,
  Chip,
  Container,
  Dialog,
  DialogContent,
  DialogTitle,
  Divider,
  FormControl,
  IconButton,
  InputAdornment,
  InputLabel,
  LinearProgress,
  MenuItem,
  Paper,
  Select,
  Stack,
  TextField,
  Tooltip,
  Typography,
  useMediaQuery,
} from '@mui/material';
import { alpha, useTheme } from '@mui/material/styles';
import { recipes, type Recipe } from '@/data/recipes';

const ALL = 'all';
const LOGO_SRC = '/images/recipes/logo.png';

const categoryOptions = [
  ALL,
  ...Array.from(new Set(recipes.map((recipe) => recipe.category))),
];
const tagOptions = Array.from(new Set(recipes.flatMap((recipe) => recipe.tags)));

const difficultyLabels: Record<Recipe['difficulty'], string> = {
  easy: 'łatwe',
  medium: 'średnie',
  slow: 'powolne',
};

function getTotalTime(recipe: Recipe) {
  return recipe.prepTime + recipe.cookTime;
}

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
  ]
    .join(' ')
    .toLowerCase()
    .includes(normalizedSearch);
}

function RecipeCard({
  recipe,
  selected,
  onOpen,
}: {
  recipe: Recipe;
  selected: boolean;
  onOpen: () => void;
}) {
  return (
    <Card
      variant='outlined'
      sx={{
        overflow: 'hidden',
        borderColor: selected ? 'primary.main' : 'app.border',
        boxShadow: (theme) =>
          selected
            ? `0 0 0 2px ${alpha(theme.palette.primary.main, 0.16)}`
            : 'none',
      }}
    >
      <CardActionArea onClick={onOpen} sx={{ height: '100%' }}>
        <Box
          component='img'
          src={recipe.image}
          alt=''
          sx={{
            display: 'block',
            width: '100%',
            aspectRatio: '4 / 3',
            objectFit: 'contain',
            backgroundColor: 'app.imageFallback',
          }}
        />
        <Box sx={{ p: 2 }}>
          <Stack direction='row' spacing={1} alignItems='center' sx={{ mb: 1 }}>
            <Chip
              size='small'
              label={recipe.category}
              color='primary'
              variant='outlined'
            />
            <Chip
              size='small'
              label={difficultyLabels[recipe.difficulty]}
              variant='outlined'
            />
          </Stack>
          <Typography
            variant='h3'
            sx={{ fontSize: '1.05rem', lineHeight: 1.2, mb: 0.75 }}
          >
            {recipe.title}
          </Typography>
          <Typography color='text.secondary' sx={{ minHeight: 44 }}>
            {recipe.description}
          </Typography>
          <Stack
            direction='row'
            spacing={1.5}
            alignItems='center'
            sx={{ mt: 1.5 }}
          >
            <Stack direction='row' spacing={0.5} alignItems='center'>
              <TimerOutlinedIcon fontSize='small' color='action' />
              <Typography variant='body2'>
                {getTotalTime(recipe)} min
              </Typography>
            </Stack>
            <Stack direction='row' spacing={0.5} alignItems='center'>
              <RestaurantMenuIcon fontSize='small' color='action' />
              <Typography variant='body2'>{recipe.servings}</Typography>
            </Stack>
          </Stack>
        </Box>
      </CardActionArea>
    </Card>
  );
}

function RecipePreview({ recipe }: { recipe: Recipe }) {
  return (
    <>
      <Box
        component='img'
        src={recipe.image}
        alt=''
        sx={{
          width: '100%',
          aspectRatio: '4 / 3',
          objectFit: 'contain',
          display: 'block',
          backgroundColor: 'app.imageFallback',
        }}
      />
      <Box sx={{ p: 2.25 }}>
        <Stack direction='row' spacing={1} sx={{ mb: 1 }}>
          <Chip size='small' color='secondary' label={recipe.category} />
          <Chip size='small' variant='outlined' label={recipe.cuisine} />
        </Stack>
        <Typography variant='h2' sx={{ fontSize: '1.45rem', mb: 0.75 }}>
          {recipe.title}
        </Typography>
        <Typography color='text.secondary' sx={{ mb: 2 }}>
          {recipe.description}
        </Typography>

        <Box
          sx={{
            display: 'grid',
            gridTemplateColumns: 'repeat(3, 1fr)',
            gap: 1,
            mb: 2,
          }}
        >
          {[
            ['Przygotowanie', `${recipe.prepTime} min`],
            ['Gotowanie', `${recipe.cookTime} min`],
            ['Porcje', recipe.servings],
          ].map(([label, value]) => (
            <Box
              key={label}
              sx={{ p: 1, bgcolor: 'app.surface', borderRadius: 2 }}
            >
              <Typography variant='caption' color='text.secondary'>
                {label}
              </Typography>
              <Typography fontWeight={800}>{value}</Typography>
            </Box>
          ))}
        </Box>

        <Stack spacing={1.75}>
          <Box>
            <Typography variant='h3' sx={{ fontSize: '1rem', mb: 1 }}>
              Składniki
            </Typography>
            <Stack component='ul' spacing={0.75} sx={{ pl: 2.5, m: 0 }}>
              {recipe.ingredients.map((ingredient) => (
                <Typography
                  component='li'
                  key={ingredient}
                  color='text.secondary'
                >
                  {ingredient}
                </Typography>
              ))}
            </Stack>
          </Box>
          <Divider />
          <Box>
            <Typography variant='h3' sx={{ fontSize: '1rem', mb: 1 }}>
              Podgląd gotowania
            </Typography>
            <LinearProgress
              variant='determinate'
              value={25}
              sx={{ mb: 1.5, height: 8, borderRadius: 4 }}
            />
            <Typography fontWeight={800} sx={{ mb: 0.75 }}>
              Krok 1 z {recipe.steps.length}
            </Typography>
            <Typography color='text.secondary'>{recipe.steps[0]}</Typography>
          </Box>
          <Paper variant='outlined' sx={{ p: 1.5, bgcolor: 'app.note' }}>
            <Typography variant='caption' color='text.secondary'>
              Notatka
            </Typography>
            <Typography>{recipe.note}</Typography>
          </Paper>
        </Stack>
      </Box>
    </>
  );
}

export function CookbookHome() {
  const theme = useTheme();
  const isLargeScreen = useMediaQuery(theme.breakpoints.up('lg'));
  const [searchTerm, setSearchTerm] = useState('');
  const [category, setCategory] = useState(ALL);
  const [activeTag, setActiveTag] = useState(ALL);
  const [sort, setSort] = useState('newest');
  const [selectedSlug, setSelectedSlug] = useState(recipes[0].slug);
  const [isRecipeDialogOpen, setIsRecipeDialogOpen] = useState(false);

  const filteredRecipes = useMemo(() => {
    return recipes
      .filter((recipe) => category === ALL || recipe.category === category)
      .filter((recipe) => activeTag === ALL || recipe.tags.includes(activeTag))
      .filter((recipe) => matchesSearch(recipe, searchTerm))
      .sort((firstRecipe, secondRecipe) => {
        if (sort === 'fastest') {
          return getTotalTime(firstRecipe) - getTotalTime(secondRecipe);
        }

        if (sort === 'title') {
          return firstRecipe.title.localeCompare(secondRecipe.title);
        }

        return secondRecipe.addedDate.localeCompare(firstRecipe.addedDate);
      });
  }, [activeTag, category, searchTerm, sort]);

  const selectedRecipe =
    filteredRecipes.find((recipe) => recipe.slug === selectedSlug) ||
    filteredRecipes[0] ||
    recipes[0];

  function openRecipe(recipe: Recipe) {
    setSelectedSlug(recipe.slug);

    if (!isLargeScreen) {
      setIsRecipeDialogOpen(true);
    }
  }

  const stats = [
    { label: 'Przepisy', value: recipes.length },
    {
      label: 'Szybkie dania',
      value: recipes.filter((recipe) => getTotalTime(recipe) <= 30).length,
    },
    { label: 'Kategorie', value: categoryOptions.length - 1 },
  ];

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
          position: 'sticky',
          top: 0,
          zIndex: 10,
        }}
      >
        <Container maxWidth='xl'>
          <Stack
            direction={{ xs: 'column', md: 'row' }}
            spacing={2}
            alignItems={{ xs: 'stretch', md: 'center' }}
            justifyContent='space-between'
            sx={{ py: 1.5 }}
          >
            <Stack direction='row' spacing={1.25} alignItems='center'>
              <Box
                component='img'
                src={LOGO_SRC}
                alt='Logo domowej książki kucharskiej'
                sx={{
                  width: { xs: 68, md: 92 },
                  height: { xs: 92, md: 126 },
                  display: 'block',
                  objectFit: 'contain',
                  flexShrink: 0,
                }}
              />
              <Box>
                <Typography
                  variant='h1'
                  sx={{ fontSize: { xs: '1.35rem', md: '1.55rem' } }}
                >
                  Domowa książka kucharska
                </Typography>
                <Typography variant='body2' color='text.secondary'>
                  Przepisy, zdjęcia, notatki i spokojny rytm gotowania
                </Typography>
              </Box>
            </Stack>
            <Stack direction='row' spacing={1} alignItems='center'>
              <Tooltip title='Ulubione'>
                <IconButton aria-label='Ulubione'>
                  <FavoriteBorderIcon />
                </IconButton>
              </Tooltip>
              <Tooltip title='Lista zakupów'>
                <IconButton aria-label='Lista zakupów'>
                  <LocalGroceryStoreIcon />
                </IconButton>
              </Tooltip>
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
              lg: '280px minmax(0, 1fr) 380px',
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
              justifyContent='space-between'
              alignItems={{ xs: 'stretch', sm: 'center' }}
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
              <Button variant='outlined' startIcon={<PrintIcon />}>
                Drukuj menu
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
                }}
              >
                {filteredRecipes.map((recipe) => (
                  <RecipeCard
                    key={recipe.slug}
                    recipe={recipe}
                    selected={selectedRecipe.slug === recipe.slug}
                    onOpen={() => openRecipe(recipe)}
                  />
                ))}
              </Box>
            ) : (
              <Paper variant='outlined' sx={{ p: 4, textAlign: 'center' }}>
                <Typography variant='h2' sx={{ fontSize: '1.25rem' }}>
                  Brak przepisów pasujących do wyszukiwania.
                </Typography>
                <Button
                  sx={{ mt: 2 }}
                  onClick={() => {
                    setSearchTerm('');
                    setCategory(ALL);
                    setActiveTag(ALL);
                  }}
                >
                  Pokaż wszystkie przepisy
                </Button>
              </Paper>
            )}
          </Box>

          <Paper
            variant='outlined'
            sx={{
              display: { xs: 'none', lg: 'block' },
              overflow: 'hidden',
              bgcolor: 'background.paper',
              position: { lg: 'sticky' },
              top: { lg: 96 },
            }}
          >
            <RecipePreview recipe={selectedRecipe} />
          </Paper>
        </Box>
      </Container>

      <Dialog
        fullScreen={!isLargeScreen}
        fullWidth
        maxWidth='sm'
        open={isRecipeDialogOpen}
        onClose={() => setIsRecipeDialogOpen(false)}
        sx={{ display: { xs: 'block', lg: 'none' } }}
      >
        <DialogTitle
          sx={{ p: 1, borderBottom: '1px solid', borderColor: 'app.border' }}
        >
          <Stack
            direction='row'
            alignItems='center'
            justifyContent='space-between'
            spacing={1}
          >
            <Typography variant='h2' sx={{ fontSize: '1rem' }}>
              Podgląd przepisu
            </Typography>
            <Tooltip title='Zamknij przepis'>
              <IconButton
                aria-label='Zamknij przepis'
                onClick={() => setIsRecipeDialogOpen(false)}
              >
                <CloseIcon />
              </IconButton>
            </Tooltip>
          </Stack>
        </DialogTitle>
        <DialogContent sx={{ p: 0 }}>
          <RecipePreview recipe={selectedRecipe} />
        </DialogContent>
      </Dialog>
    </Box>
  );
}
