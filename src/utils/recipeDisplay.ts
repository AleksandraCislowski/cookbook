import type { Recipe } from '@/data/recipes';
import { formatRecipeTime } from '@/utils/formatRecipeTime';

export const difficultyLabels: Record<Recipe['difficulty'], string> = {
  easy: 'łatwe',
  medium: 'średnie',
  slow: 'powolne',
};

export function getTotalTime(recipe: Recipe) {
  return (
    (recipe.prepTime ?? 0) +
    (recipe.cookTime ?? 0) +
    (recipe.bakeTime ?? 0) +
    (recipe.restTime ?? 0)
  );
}

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
