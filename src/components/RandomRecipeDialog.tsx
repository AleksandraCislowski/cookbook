'use client';

import CalendarMonthIcon from '@mui/icons-material/CalendarMonth';
import CasinoIcon from '@mui/icons-material/Casino';
import CloseIcon from '@mui/icons-material/Close';
import HourglassBottomIcon from '@mui/icons-material/HourglassBottom';
import RestaurantMenuIcon from '@mui/icons-material/RestaurantMenu';
import ThermostatIcon from '@mui/icons-material/Thermostat';
import TimerOutlinedIcon from '@mui/icons-material/TimerOutlined';
import {
  Box,
  Button,
  Chip,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  IconButton,
  Stack,
  Typography,
} from '@mui/material';
import { useRouter } from 'next/navigation';
import { RecipeImage } from '@/components/RecipeImage';
import { RecipeMetaItem } from '@/components/RecipeMetaItem';
import type { Recipe } from '@/data/recipes';
import { formatRecipeTime } from '@/utils/formatRecipeTime';
import {
  difficultyLabels,
  getBakingLabel,
  getPassiveTimeLabel,
  getTotalTime,
} from '@/utils/recipeDisplay';

type RandomRecipeDialogProps = {
  onClose: () => void;
  onPickAgain: () => void;
  recipe: Recipe | null;
};

export function RandomRecipeDialog({
  onClose,
  onPickAgain,
  recipe,
}: RandomRecipeDialogProps) {
  const router = useRouter();
  const bakingLabel = recipe ? getBakingLabel(recipe) : null;
  const passiveTimeLabel = recipe ? getPassiveTimeLabel(recipe) : null;
  const totalTime = recipe ? getTotalTime(recipe) : 0;

  function openRecipe() {
    if (recipe) {
      router.push(`/przepisy/${recipe.slug}`);
    }
  }

  return (
    <Dialog open={Boolean(recipe)} onClose={onClose} fullWidth maxWidth='sm'>
      {recipe ? (
        <>
          <DialogTitle sx={{ pr: 6 }}>Wylosowany przepis</DialogTitle>
          <IconButton
            aria-label='Zamknij losowanie'
            onClick={onClose}
            sx={{
              position: 'absolute',
              right: 8,
              top: 8,
            }}
          >
            <CloseIcon />
          </IconButton>
          <DialogContent dividers sx={{ p: 0 }}>
            <RecipeImage recipe={recipe} />
            <Box sx={{ p: { xs: 2, sm: 2.5 } }}>
              <Stack direction='row' flexWrap='wrap' gap={1} sx={{ mb: 1.5 }}>
                <Chip size='small' color='primary' label={recipe.category} />
                <Chip size='small' variant='outlined' label={recipe.cuisine} />
                <Chip
                  size='small'
                  variant='outlined'
                  label={difficultyLabels[recipe.difficulty]}
                />
              </Stack>
              <Typography
                variant='h2'
                sx={{ fontSize: { xs: '1.45rem', sm: '1.7rem' }, mb: 1 }}
              >
                {recipe.title}
              </Typography>
              <Typography color='text.secondary'>{recipe.description}</Typography>
              <Box
                sx={{
                  display: 'flex',
                  flexWrap: 'wrap',
                  columnGap: 2.25,
                  rowGap: 1,
                  mt: 2,
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
                {passiveTimeLabel ? (
                  <RecipeMetaItem
                    icon={
                      <HourglassBottomIcon fontSize='small' color='action' />
                    }
                  >
                    {passiveTimeLabel}
                  </RecipeMetaItem>
                ) : null}
                {recipe.servings ? (
                  <RecipeMetaItem
                    icon={
                      <RestaurantMenuIcon fontSize='small' color='action' />
                    }
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
              </Box>
              {recipe.tags.length > 0 ? (
                <Stack direction='row' flexWrap='wrap' gap={1} sx={{ mt: 2 }}>
                  {recipe.tags.map((tag) => (
                    <Chip key={tag} size='small' variant='outlined' label={tag} />
                  ))}
                </Stack>
              ) : null}
            </Box>
          </DialogContent>
          <DialogActions sx={{ px: { xs: 2, sm: 2.5 }, py: 1.5 }}>
            <Button startIcon={<CasinoIcon />} onClick={onPickAgain}>
              Losuj dalej
            </Button>
            <Button variant='contained' onClick={openRecipe}>
              Pokaż przepis
            </Button>
          </DialogActions>
        </>
      ) : null}
    </Dialog>
  );
}
