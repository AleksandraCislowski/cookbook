'use client';

import {
  createContext,
  useContext,
  useMemo,
  useState,
  type ReactNode,
} from 'react';
import type { Recipe } from '@/data/recipes';
import { scaleIngredientGroups } from '@/utils/scaleIngredient';

type RecipeServingsContextValue = {
  baseServings: number;
  portionOptions: number[];
  scaledIngredientGroups: Recipe['ingredientGroups'];
  setTargetServings: (servings: number) => void;
  targetServings: number;
};

type RecipeServingsProviderProps = {
  baseServings: number;
  children: ReactNode;
  ingredientGroups: Recipe['ingredientGroups'];
};

const defaultPortionOptions = [2, 4, 6, 8];
const RecipeServingsContext =
  createContext<RecipeServingsContextValue | null>(null);

export function RecipeServingsProvider({
  baseServings,
  children,
  ingredientGroups,
}: RecipeServingsProviderProps) {
  const [targetServings, setTargetServings] = useState(baseServings);
  const portionOptions = useMemo(
    () =>
      [...new Set([...defaultPortionOptions, baseServings])]
        .filter((servings) => servings > 0)
        .sort((firstServing, secondServing) => firstServing - secondServing),
    [baseServings],
  );
  const scaledIngredientGroups = useMemo(
    () => scaleIngredientGroups(ingredientGroups, baseServings, targetServings),
    [baseServings, ingredientGroups, targetServings],
  );
  const value = useMemo(
    () => ({
      baseServings,
      portionOptions,
      scaledIngredientGroups,
      setTargetServings,
      targetServings,
    }),
    [baseServings, portionOptions, scaledIngredientGroups, targetServings],
  );

  return (
    <RecipeServingsContext.Provider value={value}>
      {children}
    </RecipeServingsContext.Provider>
  );
}

export function useRecipeServings() {
  return useContext(RecipeServingsContext);
}
