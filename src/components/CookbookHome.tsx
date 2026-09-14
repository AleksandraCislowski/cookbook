'use client';

import { useEffect, useMemo, useState } from 'react';
import { Box, CircularProgress, Container, Typography } from '@mui/material';
import { CookbookHeader } from '@/components/CookbookHeader';
import {
  ALL_CUISINES_FILTER,
  ALL_RECIPES_FILTER,
  CookbookSidebar,
} from '@/components/CookbookSidebar';
import { RandomRecipeDialog } from '@/components/RandomRecipeDialog';
import { RecipeResults } from '@/components/RecipeResults';
import type { Recipe } from '@/data/recipes';

type RandomRecipePool = {
  key: string;
  remainingSlugs: string[];
};

const DEFAULT_SORT = 'newest';
const SORT_OPTIONS = ['newest', 'oldest', 'title'];
const FILTER_STORAGE_KEY = 'cookbook-filters';

type StoredFilters = {
  category?: string;
  cuisine?: string;
  searchTerm?: string;
  sort?: string;
};

function isSortOption(value: string | null | undefined) {
  return Boolean(value && SORT_OPTIONS.includes(value));
}

function wasPageReloaded() {
  const navigationEntry = performance.getEntriesByType(
    'navigation',
  )[0] as PerformanceNavigationTiming | undefined;

  return navigationEntry?.type === 'reload';
}

function matchesSearch(recipe: Recipe, searchTerm: string) {
  const normalizedSearch = searchTerm.trim().toLowerCase();

  if (!normalizedSearch) {
    return true;
  }

  return [
    recipe.title,
    recipe.description,
    ...recipe.categories,
    recipe.cuisine,
    ...recipe.ingredients,
    ...recipe.spices,
  ]
    .join(' ')
    .toLowerCase()
    .includes(normalizedSearch);
}

function getRandomItem<T>(items: T[]) {
  return items[Math.floor(Math.random() * items.length)];
}

export function CookbookHome({ recipes }: { recipes: Recipe[] }) {
  const categoryOptions = useMemo(
    () => [
      ALL_RECIPES_FILTER,
      ...Array.from(
        new Set(recipes.flatMap((recipe) => recipe.categories)),
      ).sort((firstCategory, secondCategory) =>
        firstCategory.localeCompare(secondCategory, 'pl'),
      ),
    ],
    [recipes],
  );
  const cuisineOptions = useMemo(
    () => [
      ALL_CUISINES_FILTER,
      ...Array.from(new Set(recipes.map((recipe) => recipe.cuisine))).sort(
        (firstCuisine, secondCuisine) =>
          firstCuisine.localeCompare(secondCuisine, 'pl'),
      ),
    ],
    [recipes],
  );
  const [searchTerm, setSearchTerm] = useState('');
  const [category, setCategory] = useState(ALL_RECIPES_FILTER);
  const [cuisine, setCuisine] = useState(ALL_CUISINES_FILTER);
  const [hasLoadedStoredFilters, setHasLoadedStoredFilters] = useState(false);
  const [randomRecipe, setRandomRecipe] = useState<Recipe | null>(null);
  const [randomRecipePool, setRandomRecipePool] =
    useState<RandomRecipePool | null>(null);
  const [sort, setSort] = useState(DEFAULT_SORT);
  const hasActiveFilters =
    searchTerm !== '' ||
    category !== ALL_RECIPES_FILTER ||
    cuisine !== ALL_CUISINES_FILTER ||
    sort !== DEFAULT_SORT;

  useEffect(() => {
    if (wasPageReloaded()) {
      sessionStorage.removeItem(FILTER_STORAGE_KEY);
      setHasLoadedStoredFilters(true);
      return;
    }

    const storedFilters = sessionStorage.getItem(FILTER_STORAGE_KEY);

    if (!storedFilters) {
      setHasLoadedStoredFilters(true);
      return;
    }

    try {
      const parsedFilters = JSON.parse(storedFilters) as StoredFilters;

      setSearchTerm(parsedFilters.searchTerm ?? '');
      setCategory(
        parsedFilters.category &&
          categoryOptions.includes(parsedFilters.category)
          ? parsedFilters.category
          : ALL_RECIPES_FILTER,
      );
      setCuisine(
        parsedFilters.cuisine && cuisineOptions.includes(parsedFilters.cuisine)
          ? parsedFilters.cuisine
          : ALL_CUISINES_FILTER,
      );
      setSort(
        isSortOption(parsedFilters.sort) ? parsedFilters.sort! : DEFAULT_SORT,
      );
    } catch {
      sessionStorage.removeItem(FILTER_STORAGE_KEY);
    }

    setHasLoadedStoredFilters(true);
  }, [categoryOptions, cuisineOptions]);

  useEffect(() => {
    if (!hasLoadedStoredFilters) {
      return;
    }

    if (!hasActiveFilters) {
      sessionStorage.removeItem(FILTER_STORAGE_KEY);
      return;
    }

    sessionStorage.setItem(
      FILTER_STORAGE_KEY,
      JSON.stringify({ category, cuisine, searchTerm, sort }),
    );
  }, [
    category,
    cuisine,
    hasActiveFilters,
    hasLoadedStoredFilters,
    searchTerm,
    sort,
  ]);

  const filteredRecipes = useMemo(() => {
    return recipes
      .filter(
        (recipe) =>
          category === ALL_RECIPES_FILTER ||
          recipe.categories.includes(category),
      )
      .filter(
        (recipe) =>
          cuisine === ALL_CUISINES_FILTER || recipe.cuisine === cuisine,
      )
      .filter((recipe) => matchesSearch(recipe, searchTerm))
      .sort((firstRecipe, secondRecipe) => {
        if (sort === 'oldest') {
          return firstRecipe.addedDate.localeCompare(secondRecipe.addedDate);
        }

        if (sort === 'title') {
          return firstRecipe.title.localeCompare(secondRecipe.title);
        }

        return secondRecipe.addedDate.localeCompare(firstRecipe.addedDate);
      });
  }, [category, cuisine, recipes, searchTerm, sort]);

  const stats = [
    { label: 'Przepisy', value: recipes.length },
    { label: 'Kategorie', value: categoryOptions.length - 1 },
    { label: 'Kuchnie', value: cuisineOptions.length - 1 },
  ];

  function resetFilters() {
    setSearchTerm('');
    setCategory(ALL_RECIPES_FILTER);
    setCuisine(ALL_CUISINES_FILTER);
    setSort('newest');
  }

  function pickRandomRecipe() {
    if (filteredRecipes.length === 0) {
      return;
    }

    const filteredRecipeSlugs = filteredRecipes.map((recipe) => recipe.slug);
    const filteredRecipeSlugSet = new Set(filteredRecipeSlugs);
    const poolKey = filteredRecipeSlugs.join('|');
    const remainingSlugs =
      randomRecipePool?.key === poolKey
        ? randomRecipePool.remainingSlugs.filter((slug) =>
            filteredRecipeSlugSet.has(slug),
          )
        : filteredRecipeSlugs;
    const isContinuingPool =
      randomRecipePool?.key === poolKey && remainingSlugs.length > 0;
    const nextCycleSlugs = filteredRecipeSlugs.filter(
      (slug) => filteredRecipes.length === 1 || slug !== randomRecipe?.slug,
    );
    const pickableSlugs = isContinuingPool ? remainingSlugs : nextCycleSlugs;
    const nextRecipeSlug = getRandomItem(pickableSlugs);
    const nextRecipe = filteredRecipes.find(
      (recipe) => recipe.slug === nextRecipeSlug,
    );

    if (!nextRecipe) {
      return;
    }

    setRandomRecipePool({
      key: poolKey,
      remainingSlugs: (isContinuingPool
        ? remainingSlugs
        : filteredRecipeSlugs
      ).filter((slug) => slug !== nextRecipe.slug),
    });
    setRandomRecipe(nextRecipe);
  }

  return (
    <Box sx={{ minHeight: '100vh', pb: 6 }}>
      <CookbookHeader />

      <Container component='main' maxWidth='xl' sx={{ pt: { xs: 3, md: 4 } }}>
        {!hasLoadedStoredFilters ? (
          <Box
            sx={{
              alignItems: 'center',
              display: 'flex',
              flexDirection: 'column',
              minHeight: 280,
              justifyContent: 'center',
              gap: 2,
            }}
          >
            <CircularProgress size={32} />
            <Typography color='text.secondary'>Ładowanie filtrów...</Typography>
          </Box>
        ) : (
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
              category={category}
              categoryOptions={categoryOptions}
              cuisine={cuisine}
              cuisineOptions={cuisineOptions}
              hasActiveFilters={hasActiveFilters}
              searchTerm={searchTerm}
              sort={sort}
              stats={stats}
              onCategoryChange={setCategory}
              onCuisineChange={setCuisine}
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
        )}
      </Container>

      <RandomRecipeDialog
        recipe={randomRecipe}
        onClose={() => setRandomRecipe(null)}
        onPickAgain={pickRandomRecipe}
      />
    </Box>
  );
}
