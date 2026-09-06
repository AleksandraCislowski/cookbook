import type { Recipe } from '@/data/recipes';
import { formatRecipeTime } from '@/utils/formatRecipeTime';

export function getPassiveTimeLabel(recipe: Recipe) {
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

export function getBakingLabel(recipe: Recipe) {
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
