'use client';

import { useMemo, useState } from 'react';
import CheckCircleOutlineIcon from '@mui/icons-material/CheckCircleOutline';
import CloseIcon from '@mui/icons-material/Close';
import NavigateBeforeIcon from '@mui/icons-material/NavigateBefore';
import NavigateNextIcon from '@mui/icons-material/NavigateNext';
import PlayCircleOutlineIcon from '@mui/icons-material/PlayCircleOutline';
import RestartAltIcon from '@mui/icons-material/RestartAlt';
import {
  Box,
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Divider,
  IconButton,
  LinearProgress,
  Paper,
  Stack,
  Tooltip,
  Typography,
} from '@mui/material';
import type { Recipe } from '@/data/recipes';

type CookingModeProps = {
  ingredientGroups: Recipe['ingredientGroups'];
  recipeTitle: string;
  spices: string[];
  steps: string[];
};

export function CookingMode({
  ingredientGroups,
  recipeTitle,
  spices,
  steps,
}: CookingModeProps) {
  const [open, setOpen] = useState(false);
  const [currentStepIndex, setCurrentStepIndex] = useState(0);
  const progress = steps.length
    ? ((currentStepIndex + 1) / steps.length) * 100
    : 0;
  const currentStep = steps[currentStepIndex];
  const isFirstStep = currentStepIndex === 0;
  const isLastStep = currentStepIndex === steps.length - 1;
  const quickIngredients = useMemo(
    () => ingredientGroups.flatMap((group) => group.items),
    [ingredientGroups],
  );

  function goToPreviousStep() {
    setCurrentStepIndex((stepIndex) => Math.max(0, stepIndex - 1));
  }

  function goToNextStep() {
    setCurrentStepIndex((stepIndex) =>
      Math.min(steps.length - 1, stepIndex + 1),
    );
  }

  function restartCookingMode() {
    setCurrentStepIndex(0);
  }

  return (
    <>
      <Tooltip title='Tryb gotowania'>
        <IconButton
          aria-label='Otwórz tryb gotowania'
          size='small'
          disabled={steps.length === 0}
          onClick={() => setOpen(true)}
        >
          <PlayCircleOutlineIcon fontSize='small' />
        </IconButton>
      </Tooltip>

      <Dialog
        className='no-print'
        open={open}
        onClose={() => setOpen(false)}
        fullScreen
        PaperProps={{
          sx: {
            bgcolor: 'background.default',
          },
        }}
      >
        <DialogTitle sx={{ pr: 7 }}>
          <Typography
            component='span'
            variant='caption'
            color='text.secondary'
            sx={{ display: 'block', mb: 0.25 }}
          >
            Tryb gotowania
          </Typography>
          <Typography
            component='span'
            variant='h1'
            sx={{ display: 'block', fontSize: { xs: '1.6rem', sm: '2rem' } }}
          >
            {recipeTitle}
          </Typography>
        </DialogTitle>
        <IconButton
          aria-label='Zamknij tryb gotowania'
          onClick={() => setOpen(false)}
          sx={{ position: 'absolute', right: 12, top: 12 }}
        >
          <CloseIcon />
        </IconButton>

        <DialogContent dividers sx={{ p: { xs: 2, md: 3 } }}>
          <Box
            sx={{
              display: 'grid',
              gridTemplateColumns: { xs: '1fr', md: 'minmax(0, 1fr) 340px' },
              gap: { xs: 2, md: 3 },
              maxWidth: 1120,
              mx: 'auto',
            }}
          >
            <Paper
              variant='outlined'
              sx={{
                minHeight: { xs: 360, md: 520 },
                p: { xs: 2, sm: 3, md: 4 },
                display: 'flex',
                flexDirection: 'column',
              }}
            >
              <Stack spacing={1.5} sx={{ mb: 3 }}>
                <Stack
                  direction='row'
                  alignItems='center'
                  justifyContent='space-between'
                  spacing={2}
                >
                  <Typography fontWeight={800}>
                    Krok {currentStepIndex + 1} z {steps.length}
                  </Typography>
                  <Button
                    size='small'
                    startIcon={<RestartAltIcon />}
                    disabled={isFirstStep}
                    onClick={restartCookingMode}
                  >
                    Od początku
                  </Button>
                </Stack>
                <LinearProgress
                  variant='determinate'
                  value={progress}
                  sx={{ height: 8, borderRadius: 999 }}
                />
              </Stack>

              <Box
                sx={{
                  flex: 1,
                  display: 'flex',
                  alignItems: 'center',
                }}
              >
                <Typography
                  component='p'
                  sx={{
                    fontSize: { xs: '1.45rem', sm: '1.8rem', md: '2.15rem' },
                    lineHeight: 1.25,
                    fontWeight: 750,
                    overflowWrap: 'break-word',
                  }}
                >
                  {currentStep}
                </Typography>
              </Box>

            </Paper>

            <Paper
              variant='outlined'
              sx={{
                p: { xs: 2, md: 2.5 },
                alignSelf: 'start',
              }}
            >
              <Typography variant='h2' sx={{ fontSize: '1.2rem', mb: 1.5 }}>
                Pod ręką
              </Typography>

              <Stack spacing={ingredientGroups.length > 1 ? 1.75 : 0}>
                {ingredientGroups.map((group, groupIndex) => (
                  <Box key={`${group.title}-${groupIndex}`}>
                    {group.title ? (
                      <Typography
                        variant='h3'
                        sx={{ fontSize: '0.95rem', lineHeight: 1.2, mb: 0.75 }}
                      >
                        {group.title}
                      </Typography>
                    ) : null}
                    <Stack component='ul' spacing={0.7} sx={{ m: 0, pl: 2.5 }}>
                      {group.items.map((ingredient, index) => (
                        <Typography
                          component='li'
                          key={`${ingredient}-${index}`}
                          color='text.secondary'
                          sx={{ lineHeight: 1.35 }}
                        >
                          {ingredient}
                        </Typography>
                      ))}
                    </Stack>
                  </Box>
                ))}
              </Stack>

              {spices.length > 0 ? (
                <>
                  <Divider sx={{ my: 2 }} />
                  <Typography
                    variant='h3'
                    sx={{ fontSize: '0.95rem', lineHeight: 1.2, mb: 0.75 }}
                  >
                    Przyprawy
                  </Typography>
                  <Stack component='ul' spacing={0.7} sx={{ m: 0, pl: 2.5 }}>
                    {spices.map((spice, index) => (
                      <Typography
                        component='li'
                        key={`${spice}-${index}`}
                        color='text.secondary'
                        sx={{ lineHeight: 1.35 }}
                      >
                        {spice}
                      </Typography>
                    ))}
                  </Stack>
                </>
              ) : null}

              <Typography
                variant='caption'
                color='text.secondary'
                sx={{ display: 'block', mt: 2 }}
              >
                {quickIngredients.length + spices.length} rzeczy na liście
              </Typography>
            </Paper>
          </Box>
        </DialogContent>

        <DialogActions
          sx={{
            justifyContent: 'center',
            px: { xs: 2, md: 3 },
            py: 1.5,
          }}
        >
          <Stack
            direction='row'
            spacing={1}
            sx={{ width: '100%', maxWidth: 720 }}
          >
            <Button
              fullWidth
              variant='outlined'
              startIcon={<NavigateBeforeIcon />}
              disabled={isFirstStep}
              onClick={goToPreviousStep}
            >
              Wstecz
            </Button>
            <Button
              fullWidth
              variant='contained'
              endIcon={
                isLastStep ? <CheckCircleOutlineIcon /> : <NavigateNextIcon />
              }
              onClick={isLastStep ? () => setOpen(false) : goToNextStep}
            >
              {isLastStep ? 'Gotowe' : 'Dalej'}
            </Button>
          </Stack>
        </DialogActions>
      </Dialog>
    </>
  );
}
