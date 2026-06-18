'use client';

import CalendarMonthIcon from '@mui/icons-material/CalendarMonth';
import DeleteOutlineIcon from '@mui/icons-material/DeleteOutline';
import OpenInNewIcon from '@mui/icons-material/OpenInNew';
import RestaurantMenuIcon from '@mui/icons-material/RestaurantMenu';
import {
  Box,
  Button,
  Chip,
  FormControl,
  IconButton,
  InputLabel,
  MenuItem,
  Paper,
  Select,
  Stack,
  Tooltip,
  Typography,
} from '@mui/material';
import { alpha } from '@mui/material/styles';
import Link from 'next/link';
import { useEffect, useMemo, useState } from 'react';
import {
  countPlannedMeals,
  createEmptyMealPlan,
  createMealPlanDocument,
  MEAL_SLOTS,
  NO_MEAL_VALUE,
  type MealPlanDocument,
  type MealSlotKey,
  type WeekDayKey,
  WEEK_DAYS,
} from '@/data/mealPlan';
import type { Recipe } from '@/data/recipes';
import {
  readLocalMealPlanDocument,
  saveLocalMealPlanDocument,
} from '@/utils/mealPlanStorage';
import { appColors } from '@/theme';

const selectMenuProps = {
  PaperProps: {
    sx: {
      maxHeight: 320,
      maxWidth: { xs: 'calc(100vw - 32px)', sm: 420 },
    },
  },
  MenuListProps: {
    dense: true,
  },
};

const dayAccentColors: Record<WeekDayKey, string> = {
  monday: appColors.blue,
  tuesday: appColors.mint,
  wednesday: appColors.saffron,
  thursday: appColors.tomato,
  friday: appColors.sky,
  saturday: appColors.blueDark,
  sunday: appColors.mint,
};

export function WeeklyMealPlanner({ recipes }: { recipes: Recipe[] }) {
  const [mealPlanDocument, setMealPlanDocument] =
    useState<MealPlanDocument>(() => createMealPlanDocument());
  const [hasLoadedStoredPlan, setHasLoadedStoredPlan] = useState(false);
  const mealPlan = mealPlanDocument.meals;

  const recipesBySlug = useMemo(
    () => new Map(recipes.map((recipe) => [recipe.slug, recipe])),
    [recipes],
  );
  const plannedMealsCount = countPlannedMeals(mealPlan);

  useEffect(() => {
    setMealPlanDocument(readLocalMealPlanDocument());
    setHasLoadedStoredPlan(true);
  }, []);

  useEffect(() => {
    if (!hasLoadedStoredPlan) {
      return;
    }

    saveLocalMealPlanDocument(mealPlanDocument);
  }, [hasLoadedStoredPlan, mealPlanDocument]);

  function updateMealPlanDocument(
    updater: (currentDocument: MealPlanDocument) => MealPlanDocument,
  ) {
    setMealPlanDocument((currentDocument) =>
      updater({
        ...currentDocument,
        updatedAt: new Date().toISOString(),
      }),
    );
  }

  function updateMeal(
    dayKey: WeekDayKey,
    mealSlotKey: MealSlotKey,
    recipeSlug: string,
  ) {
    updateMealPlanDocument((currentDocument) => ({
      ...currentDocument,
      meals: {
        ...currentDocument.meals,
        [dayKey]: {
          ...currentDocument.meals[dayKey],
          [mealSlotKey]: recipeSlug,
        },
      },
    }));
  }

  function clearDay(dayKey: WeekDayKey) {
    updateMealPlanDocument((currentDocument) => ({
      ...currentDocument,
      meals: {
        ...currentDocument.meals,
        [dayKey]: createEmptyMealPlan()[dayKey],
      },
    }));
  }

  function clearWeek() {
    updateMealPlanDocument((currentDocument) => ({
      ...currentDocument,
      meals: createEmptyMealPlan(),
    }));
  }

  return (
    <Paper
      variant='outlined'
      sx={{
        mb: 3,
        overflow: 'hidden',
        bgcolor: 'background.paper',
        borderColor: 'app.border',
      }}
    >
      <Box sx={{ p: { xs: 2, md: 2.5 } }}>
        <Stack
          direction={{ xs: 'column', md: 'row' }}
          spacing={1.5}
          alignItems={{ xs: 'stretch', md: 'center' }}
          justifyContent='space-between'
          sx={{ mb: 2 }}
        >
          <Stack direction='row' spacing={1.25} alignItems='center'>
            <CalendarMonthIcon color='primary' />
            <Box>
              <Typography variant='h2' sx={{ fontSize: '1.2rem' }}>
                Plan tygodnia
              </Typography>
              <Typography color='text.secondary'>
                Zaplanowano {plannedMealsCount} z{' '}
                {WEEK_DAYS.length * MEAL_SLOTS.length} posiłków
              </Typography>
            </Box>
          </Stack>
          <Button
            variant='outlined'
            startIcon={<DeleteOutlineIcon />}
            disabled={plannedMealsCount === 0}
            onClick={clearWeek}
            sx={{ flexShrink: 0 }}
          >
            Wyczyść tydzień
          </Button>
        </Stack>

        <Box
          sx={{
            display: 'grid',
            gridTemplateColumns: {
              xs: '1fr',
              sm: 'repeat(2, minmax(0, 1fr))',
              xl: 'repeat(3, minmax(0, 1fr))',
            },
            gap: 1.25,
          }}
        >
          {WEEK_DAYS.map((day) => {
            const plannedDayMeals = MEAL_SLOTS.filter((slot) =>
              Boolean(mealPlan[day.key][slot.key]) &&
              mealPlan[day.key][slot.key] !== NO_MEAL_VALUE,
            );
            const hasDaySelections = MEAL_SLOTS.some((slot) =>
              Boolean(mealPlan[day.key][slot.key]),
            );
            const dayAccentColor = dayAccentColors[day.key];

            return (
              <Box
                key={day.key}
                sx={{
                  display: 'grid',
                  gridTemplateRows: 'auto auto',
                  minWidth: 0,
                  minHeight: 250,
                  p: 1.5,
                  border: 1,
                  borderTop: 4,
                  borderColor: 'app.border',
                  borderTopColor: dayAccentColor,
                  borderRadius: 1,
                  bgcolor: (theme) =>
                    plannedDayMeals.length > 0
                      ? alpha(dayAccentColor, 0.06)
                      : theme.palette.background.paper,
                  boxShadow:
                    plannedDayMeals.length > 0
                      ? `0 10px 28px ${alpha(dayAccentColor, 0.1)}`
                      : 'none',
                }}
              >
                <Stack
                  direction='row'
                  spacing={1}
                  alignItems='center'
                  justifyContent='space-between'
                  sx={{ mb: 1 }}
                >
                  <Box sx={{ minWidth: 0 }}>
                    <Typography fontWeight={800} noWrap>
                      {day.label}
                    </Typography>
                  </Box>
                  <Stack direction='row' spacing={0.25}>
                    <Chip
                      size='small'
                      label={`${plannedDayMeals.length}/3`}
                      variant='outlined'
                      sx={{
                        height: 24,
                        borderColor: alpha(dayAccentColor, 0.45),
                        bgcolor:
                          plannedDayMeals.length > 0
                            ? alpha(dayAccentColor, 0.12)
                            : 'transparent',
                        color: 'text.primary',
                        fontWeight: 800,
                      }}
                    />
                    <Tooltip title='Wyczyść dzień'>
                      <span>
                        <IconButton
                          size='small'
                          disabled={!hasDaySelections}
                          aria-label={`Wyczyść ${day.label}`}
                          onClick={() => clearDay(day.key)}
                        >
                          <DeleteOutlineIcon fontSize='small' />
                        </IconButton>
                      </span>
                    </Tooltip>
                  </Stack>
                </Stack>

                <Stack spacing={1.25} justifyContent='end'>
                  {MEAL_SLOTS.map((slot) => {
                    const selectedRecipe = recipesBySlug.get(
                      mealPlan[day.key][slot.key],
                    );

                    return (
                      <Stack
                        key={slot.key}
                        direction='row'
                        spacing={0.75}
                        alignItems='center'
                        sx={{ minWidth: 0 }}
                      >
                        <FormControl size='small' fullWidth sx={{ minWidth: 0 }}>
                          <InputLabel id={`${day.key}-${slot.key}-meal-label`}>
                            {slot.label}
                          </InputLabel>
                          <Select
                            labelId={`${day.key}-${slot.key}-meal-label`}
                            value={mealPlan[day.key][slot.key]}
                            label={slot.label}
                            MenuProps={selectMenuProps}
                            onChange={(event) =>
                              updateMeal(
                                day.key,
                                slot.key,
                                event.target.value,
                              )
                            }
                            renderValue={(value) => {
                              if (value === NO_MEAL_VALUE) {
                                return (
                                  <Typography
                                    component='span'
                                    color='text.secondary'
                                    noWrap
                                    sx={{ display: 'block', maxWidth: '100%' }}
                                  >
                                    Brak posiłku
                                  </Typography>
                                );
                              }

                              const recipe = recipesBySlug.get(value);

                              return (
                                <Typography
                                  component='span'
                                  noWrap
                                  sx={{ display: 'block', maxWidth: '100%' }}
                                >
                                  {recipe?.title ?? slot.label}
                                </Typography>
                              );
                            }}
                            sx={{
                              minWidth: 0,
                              bgcolor: selectedRecipe
                                ? alpha(dayAccentColor, 0.08)
                                : 'background.paper',
                              '& .MuiSelect-select': {
                                display: 'block',
                                minWidth: 0,
                                overflow: 'hidden',
                                textOverflow: 'ellipsis',
                                whiteSpace: 'nowrap',
                              },
                              '& .MuiOutlinedInput-notchedOutline': {
                                borderColor: selectedRecipe
                                  ? alpha(dayAccentColor, 0.5)
                                  : undefined,
                              },
                            }}
                          >
                            <MenuItem value={NO_MEAL_VALUE}>
                              <Stack
                                direction='row'
                                spacing={1}
                                alignItems='center'
                                sx={{ minWidth: 0 }}
                              >
                                <RestaurantMenuIcon fontSize='small' />
                                <Typography noWrap>Brak posiłku</Typography>
                              </Stack>
                            </MenuItem>
                            {recipes.map((recipe) => (
                              <MenuItem
                                key={recipe.slug}
                                value={recipe.slug}
                                sx={{ whiteSpace: 'normal' }}
                              >
                                {recipe.title}
                              </MenuItem>
                            ))}
                          </Select>
                        </FormControl>

                        <Tooltip title='Otwórz przepis'>
                          <span>
                            <IconButton
                              component={selectedRecipe ? Link : 'button'}
                              href={
                                selectedRecipe
                                  ? `/recipes/${selectedRecipe.slug}`
                                  : undefined
                              }
                              target={selectedRecipe ? '_blank' : undefined}
                              rel={
                                selectedRecipe
                                  ? 'noopener noreferrer'
                                  : undefined
                              }
                              size='small'
                              disabled={!selectedRecipe}
                              aria-label={
                                selectedRecipe
                                  ? `Otwórz przepis ${selectedRecipe.title}`
                                  : `Brak przepisu dla ${slot.label.toLowerCase()}`
                              }
                              sx={{ flexShrink: 0 }}
                            >
                              <OpenInNewIcon fontSize='small' />
                            </IconButton>
                          </span>
                        </Tooltip>
                      </Stack>
                    );
                  })}
                </Stack>
              </Box>
            );
          })}
        </Box>
      </Box>
    </Paper>
  );
}
