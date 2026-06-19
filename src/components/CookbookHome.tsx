'use client';

import { useMemo, useState } from 'react';
import { Box, Container } from '@mui/material';
import { CookbookHeader } from '@/components/CookbookHeader';
import {
  ALL_RECIPES_FILTER,
  CookbookSidebar,
} from '@/components/CookbookSidebar';
import { RandomRecipeDialog } from '@/components/RandomRecipeDialog';
import { RecipeResults } from '@/components/RecipeResults';
import type { Recipe } from '@/data/recipes';
import { getTotalTime } from '@/utils/recipeDisplay';

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
      ALL_RECIPES_FILTER,
      ...Array.from(new Set(recipes.map((recipe) => recipe.category))),
    ],
    [recipes],
  );
  const tagOptions = useMemo(
    () => Array.from(new Set(recipes.flatMap((recipe) => recipe.tags))),
    [recipes],
  );
  const [searchTerm, setSearchTerm] = useState('');
  const [category, setCategory] = useState(ALL_RECIPES_FILTER);
  const [activeTag, setActiveTag] = useState(ALL_RECIPES_FILTER);
  const [randomRecipe, setRandomRecipe] = useState<Recipe | null>(null);
  const [sort, setSort] = useState('newest');
  const hasActiveFilters =
    searchTerm !== '' ||
    category !== ALL_RECIPES_FILTER ||
    activeTag !== ALL_RECIPES_FILTER ||
    sort !== 'newest';

  const filteredRecipes = useMemo(() => {
    return recipes
      .filter(
        (recipe) =>
          category === ALL_RECIPES_FILTER || recipe.category === category,
      )
      .filter(
        (recipe) =>
          activeTag === ALL_RECIPES_FILTER || recipe.tags.includes(activeTag),
      )
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
    setCategory(ALL_RECIPES_FILTER);
    setActiveTag(ALL_RECIPES_FILTER);
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
      <CookbookHeader />

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
          <CookbookSidebar
            activeTag={activeTag}
            category={category}
            categoryOptions={categoryOptions}
            hasActiveFilters={hasActiveFilters}
            searchTerm={searchTerm}
            sort={sort}
            stats={stats}
            tagOptions={tagOptions}
            onActiveTagChange={setActiveTag}
            onCategoryChange={setCategory}
            onResetFilters={resetFilters}
            onSearchTermChange={setSearchTerm}
            onSortChange={setSort}
          />

          <RecipeResults
            filteredRecipes={filteredRecipes}
            onPickRandomRecipe={pickRandomRecipe}
            onResetFilters={resetFilters}
          />
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
