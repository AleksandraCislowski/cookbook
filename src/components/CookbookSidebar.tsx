import FilterListIcon from '@mui/icons-material/FilterList';
import RestartAltIcon from '@mui/icons-material/RestartAlt';
import SearchIcon from '@mui/icons-material/Search';
import {
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

type CookbookStat = {
  label: string;
  value: number;
};

type CookbookSidebarProps = {
  category: string;
  categoryOptions: string[];
  hasActiveFilters: boolean;
  onCategoryChange: (category: string) => void;
  onResetFilters: () => void;
  onSearchTermChange: (searchTerm: string) => void;
  onSortChange: (sort: string) => void;
  searchTerm: string;
  sort: string;
  stats: CookbookStat[];
};

export function CookbookSidebar({
  category,
  categoryOptions,
  hasActiveFilters,
  onCategoryChange,
  onResetFilters,
  onSearchTermChange,
  onSortChange,
  searchTerm,
  sort,
  stats,
}: CookbookSidebarProps) {
  return (
    <Stack spacing={2}>
      <Paper variant='outlined' sx={{ p: 2, bgcolor: 'background.paper' }}>
        <Stack direction='row' spacing={1} alignItems='center' sx={{ mb: 2 }}>
          <FilterListIcon color='primary' />
          <Typography variant='h2' sx={{ fontSize: '1rem' }}>
            Przeglądaj
          </Typography>
        </Stack>
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
            <InputLabel id='category-filter-label'>Kategoria</InputLabel>
            <Select
              labelId='category-filter-label'
              value={category}
              label='Kategoria'
              onChange={(event) => onCategoryChange(event.target.value)}
            >
              {categoryOptions.map((option) => (
                <MenuItem key={option} value={option}>
                  {option === ALL_RECIPES_FILTER
                    ? 'Wszystkie kategorie'
                    : option}
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
              onChange={(event) => onSortChange(event.target.value)}
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
            onClick={onResetFilters}
          >
            Resetuj filtry
          </Button>
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
  );
}
