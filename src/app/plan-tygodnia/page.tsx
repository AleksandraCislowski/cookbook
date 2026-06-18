import { Box, Container, Stack, Typography } from '@mui/material';
import type { Metadata } from 'next';
import { CookbookHeader } from '@/components/CookbookHeader';
import { WeeklyMealPlanner } from '@/components/WeeklyMealPlanner';
import { getRecipes } from '@/data/recipes';

export const metadata: Metadata = {
  title: 'Plan tygodnia | Kącik Kulinarny Aleksandry',
  description: 'Tygodniowy plan posiłków z przepisów w książce kucharskiej.',
};

export default function WeeklyMealPlanPage() {
  const recipes = getRecipes();

  return (
    <Box sx={{ minHeight: '100vh', pb: 6 }}>
      <CookbookHeader />

      <Container maxWidth='xl' sx={{ pt: { xs: 3, md: 4 } }}>
        <Stack spacing={2.5}>
          <Box>
            <Typography
              variant='h1'
              sx={{ fontSize: { xs: '1.8rem', md: '2.4rem' }, lineHeight: 1 }}
            >
              Plan tygodnia
            </Typography>
            <Typography color='text.secondary' sx={{ mt: 1 }}>
              Zaplanuj śniadania, obiady i kolacje na cały tydzień.
            </Typography>
          </Box>

          <WeeklyMealPlanner recipes={recipes} />
        </Stack>
      </Container>
    </Box>
  );
}
