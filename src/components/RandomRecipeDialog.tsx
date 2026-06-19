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
    <Dialog
      open={Boolean(recipe)}
      onClose={onClose}
      fullWidth
      maxWidth='sm'
      slotProps={{
        paper: {
          sx: {
            height: { xs: 'calc(100dvh - 32px)', sm: 720 },
            maxHeight: 'calc(100dvh - 32px)',
          },
        },
      }}
    >
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
          <DialogContent
            dividers
            sx={{
              display: 'flex',
              minHeight: 0,
              flex: 1,
              flexDirection: 'column',
              overflow: 'hidden',
              p: 0,
            }}
          >
            <RecipeImage recipe={recipe} />
            <Box
              sx={{
                flex: 1,
                minHeight: 0,
                overflow: 'auto',
                p: { xs: 2, sm: 2.5 },
              }}
            >
              <Stack direction='row' flexWrap='wrap' gap={1} sx={{ mb: 1.5 }}>
                {recipe.categories.map((category) => (
                  <Chip
                    key={category}
                    size='small'
                    color='primary'
                    label={category}
                  />
                ))}
                <Chip size='small' variant='outlined' label={recipe.cuisine} />
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
