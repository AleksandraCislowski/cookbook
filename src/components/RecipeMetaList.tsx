import CalendarMonthIcon from '@mui/icons-material/CalendarMonth';
import HourglassBottomIcon from '@mui/icons-material/HourglassBottom';
import RestaurantMenuIcon from '@mui/icons-material/RestaurantMenu';
import ThermostatIcon from '@mui/icons-material/Thermostat';
import TimerOutlinedIcon from '@mui/icons-material/TimerOutlined';
import { Box } from '@mui/material';
import { RecipeMetaItem } from '@/components/RecipeMetaItem';
import type { Recipe } from '@/data/recipes';
import { formatRecipeTime } from '@/utils/formatRecipeTime';
import {
  getBakingLabel,
  getPassiveTimeLabel,
  getTotalTime,
} from '@/utils/recipeDisplay';

type RecipeMetaListProps = {
  recipe: Recipe;
  rowGap?: number;
};

export function RecipeMetaList({ recipe, rowGap = 0.85 }: RecipeMetaListProps) {
  const bakingLabel = getBakingLabel(recipe);
  const totalTime = getTotalTime(recipe);
  const passiveTimeLabel = getPassiveTimeLabel(recipe);

  return (
    <Box
      sx={{
        display: 'flex',
        flexWrap: 'wrap',
        alignItems: 'flex-start',
        columnGap: 2.25,
        rowGap,
      }}
    >
      {totalTime > 0 ? (
        <RecipeMetaItem
          icon={<TimerOutlinedIcon fontSize='small' color='action' />}
        >
          Razem {formatRecipeTime(totalTime)}
        </RecipeMetaItem>
      ) : null}
      {recipe.advanceNotice ? (
        <RecipeMetaItem
          icon={<CalendarMonthIcon fontSize='small' color='action' />}
        >
          {recipe.advanceNotice}
        </RecipeMetaItem>
      ) : null}
      {recipe.servings ? (
        <RecipeMetaItem
          icon={<RestaurantMenuIcon fontSize='small' color='action' />}
        >
          {recipe.servings}
        </RecipeMetaItem>
      ) : null}
      {bakingLabel ? (
        <RecipeMetaItem
          icon={<ThermostatIcon fontSize='small' color='action' />}
        >
          {bakingLabel}
        </RecipeMetaItem>
      ) : null}
      {passiveTimeLabel ? (
        <RecipeMetaItem
          icon={<HourglassBottomIcon fontSize='small' color='action' />}
        >
          {passiveTimeLabel}
        </RecipeMetaItem>
      ) : null}
    </Box>
  );
}
