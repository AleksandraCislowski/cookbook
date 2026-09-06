import CalendarMonthIcon from '@mui/icons-material/CalendarMonth';
import HourglassBottomIcon from '@mui/icons-material/HourglassBottom';
import HourglassEmptyIcon from '@mui/icons-material/HourglassEmpty';
import KitchenIcon from '@mui/icons-material/Kitchen';
import RestaurantMenuIcon from '@mui/icons-material/RestaurantMenu';
import SoupKitchenIcon from '@mui/icons-material/SoupKitchen';
import ThermostatIcon from '@mui/icons-material/Thermostat';
import { Box } from '@mui/material';
import { RecipeMetaItem } from '@/components/RecipeMetaItem';
import type { Recipe } from '@/data/recipes';
import { formatRecipeTime } from '@/utils/formatRecipeTime';
import { getBakingLabel, getPassiveTimeLabel } from '@/utils/recipeDisplay';

type RecipeMetaListProps = {
  recipe: Recipe;
  rowGap?: number;
};

export function RecipeMetaList({ recipe, rowGap = 0.85 }: RecipeMetaListProps) {
  const bakingLabel = getBakingLabel(recipe);
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
      {recipe.prepTime ? (
        <RecipeMetaItem icon={<KitchenIcon fontSize='small' color='action' />}>
          Przygot. {formatRecipeTime(recipe.prepTime)}
        </RecipeMetaItem>
      ) : null}
      {recipe.cookTime ? (
        <RecipeMetaItem
          icon={<SoupKitchenIcon fontSize='small' color='action' />}
        >
          Gotowanie {formatRecipeTime(recipe.cookTime)}
        </RecipeMetaItem>
      ) : null}
      {bakingLabel ? (
        <RecipeMetaItem
          icon={<ThermostatIcon fontSize='small' color='action' />}
        >
          {bakingLabel}
        </RecipeMetaItem>
      ) : null}
      {recipe.restTime ? (
        <RecipeMetaItem
          icon={<HourglassEmptyIcon fontSize='small' color='action' />}
        >
          Odpoczynek {formatRecipeTime(recipe.restTime)}
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
