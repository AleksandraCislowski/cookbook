import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import FilterListIcon from '@mui/icons-material/FilterList';
import RestartAltIcon from '@mui/icons-material/RestartAlt';
import SearchIcon from '@mui/icons-material/Search';
import {
  Accordion,
  AccordionDetails,
  AccordionSummary,
  Button,
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

export const ALL_RECIPES_FILTER = 'all';
export const ALL_CUISINES_FILTER = 'all';

type CookbookStat = {
  label: string;
  value: number;
};

type CookbookSidebarProps = {
  category: string;
  categoryOptions: string[];
  cuisine: string;
  cuisineOptions: string[];
  hasActiveFilters: boolean;
  onCategoryChange: (category: string) => void;
  onCuisineChange: (cuisine: string) => void;
  onResetFilters: () => void;
  onSearchTermChange: (searchTerm: string) => void;
  onSortChange: (sort: string) => void;
  searchTerm: string;
  sort: string;
  stats: CookbookStat[];
};

type FilterControlsProps = Omit<CookbookSidebarProps, 'stats'> & {
  idPrefix: string;
};

function FilterControls({
  category,
  categoryOptions,
  cuisine,
  cuisineOptions,
  hasActiveFilters,
  idPrefix,
  onCategoryChange,
  onCuisineChange,
  onResetFilters,
  onSearchTermChange,
  onSortChange,
  searchTerm,
  sort,
}: FilterControlsProps) {
  const categoryLabelId = `${idPrefix}-category-filter-label`;
  const cuisineLabelId = `${idPrefix}-cuisine-filter-label`;
  const sortLabelId = `${idPrefix}-sort-label`;

  return (
    <Stack spacing={2}>
      <TextField
        value={searchTerm}
        onChange={(event) => onSearchTermChange(event.target.value)}
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
        <InputLabel id={categoryLabelId}>Kategoria</InputLabel>
        <Select
          labelId={categoryLabelId}
          value={category}
          label='Kategoria'
          onChange={(event) => onCategoryChange(event.target.value)}
        >
          {categoryOptions.map((option) => (
            <MenuItem key={option} value={option}>
              {option === ALL_RECIPES_FILTER ? 'Wszystkie kategorie' : option}
            </MenuItem>
          ))}
        </Select>
      </FormControl>
      <FormControl size='small' fullWidth>
        <InputLabel id={cuisineLabelId}>Kuchnia</InputLabel>
        <Select
          labelId={cuisineLabelId}
          value={cuisine}
          label='Kuchnia'
          onChange={(event) => onCuisineChange(event.target.value)}
        >
          {cuisineOptions.map((option) => (
            <MenuItem key={option} value={option}>
              {option === ALL_CUISINES_FILTER ? 'Wszystkie kuchnie' : option}
            </MenuItem>
          ))}
        </Select>
      </FormControl>
      <FormControl size='small' fullWidth>
        <InputLabel id={sortLabelId}>Sortowanie</InputLabel>
        <Select
          labelId={sortLabelId}
          value={sort}
          label='Sortowanie'
          onChange={(event) => onSortChange(event.target.value)}
        >
          <MenuItem value='newest'>Najnowsze</MenuItem>
          <MenuItem value='oldest'>Najstarsze</MenuItem>
          <MenuItem value='title'>Alfabetycznie</MenuItem>
        </Select>
      </FormControl>
      <Button
        variant='outlined'
        startIcon={<RestartAltIcon />}
        disabled={!hasActiveFilters}
        onClick={onResetFilters}
      >
        Resetuj filtry
      </Button>
    </Stack>
  );
}

export function CookbookSidebar({
  category,
  categoryOptions,
  cuisine,
  cuisineOptions,
  hasActiveFilters,
  onCategoryChange,
  onCuisineChange,
  onResetFilters,
  onSearchTermChange,
  onSortChange,
  searchTerm,
  sort,
  stats,
}: CookbookSidebarProps) {
  const filterControlsProps = {
    category,
    categoryOptions,
    cuisine,
    cuisineOptions,
    hasActiveFilters,
    onCategoryChange,
    onCuisineChange,
    onResetFilters,
    onSearchTermChange,
    onSortChange,
    searchTerm,
    sort,
  };

  return (
    <>
      <Accordion
        disableGutters
        variant='outlined'
        sx={{
          bgcolor: 'background.paper',
          display: { xs: 'block', lg: 'none' },
          position: 'sticky',
          top: 8,
          zIndex: (theme) => theme.zIndex.appBar,
          '&:before': { display: 'none' },
        }}
      >
        <AccordionSummary expandIcon={<ExpandMoreIcon />}>
          <Stack direction='row' spacing={1} alignItems='center'>
            <FilterListIcon color='primary' />
            <Typography fontWeight={800}>Filtry</Typography>
            {hasActiveFilters ? (
              <Typography color='primary' fontWeight={700}>
                aktywne
              </Typography>
            ) : null}
          </Stack>
        </AccordionSummary>
        <AccordionDetails sx={{ pt: 0 }}>
          <FilterControls {...filterControlsProps} idPrefix='mobile' />
        </AccordionDetails>
      </Accordion>

      <Stack
        spacing={2}
        sx={{
          display: { xs: 'none', lg: 'flex' },
          position: { lg: 'sticky' },
          top: { lg: 24 },
          maxHeight: { lg: 'calc(100vh - 48px)' },
          overflowY: { lg: 'auto' },
        }}
      >
        <Paper variant='outlined' sx={{ p: 2, bgcolor: 'background.paper' }}>
          <Stack direction='row' spacing={1} alignItems='center' sx={{ mb: 2 }}>
            <FilterListIcon color='primary' />
            <Typography variant='h2' sx={{ fontSize: '1rem' }}>
              Przeglądaj
            </Typography>
          </Stack>
          <FilterControls {...filterControlsProps} idPrefix='desktop' />
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
    </>
  );
}
