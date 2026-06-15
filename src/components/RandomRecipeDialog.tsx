'use client';

import CasinoIcon from '@mui/icons-material/Casino';
import CloseIcon from '@mui/icons-material/Close';
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
import { RecipeMetaList } from '@/components/RecipeMetaList';
import type { Recipe } from '@/data/recipes';
import { difficultyLabels } from '@/utils/recipeDisplay';

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

  function openRecipe() {
    if (recipe) {
      router.push(`/recipes/${recipe.slug}`);
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
              <Box sx={{ mt: 2 }}>
                <RecipeMetaList recipe={recipe} rowGap={1} />
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
