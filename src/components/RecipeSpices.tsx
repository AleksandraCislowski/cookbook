'use client';

import { Box, Paper, Stack, Typography } from '@mui/material';
import type { Recipe } from '@/data/recipes';

type RecipeSpicesProps = {
  spiceGroups: Recipe['spiceGroups'];
};

export function RecipeSpices({ spiceGroups }: RecipeSpicesProps) {
  if (spiceGroups.length === 0) {
    return null;
  }

  return (
    <Paper
      className='recipe-spices-card print-card'
      variant='outlined'
      sx={{
        order: { xs: 4, md: 'initial' },
        p: { xs: 2, md: 2.5 },
      }}
    >
      <Typography variant='h2' sx={{ fontSize: '1.25rem', mb: 1.5 }}>
        Przyprawy
      </Typography>
      <Stack spacing={spiceGroups.length > 1 ? 1.75 : 0}>
        {spiceGroups.map((group, groupIndex) => (
          <Box key={`${group.title}-${groupIndex}`}>
            {group.title ? (
              <Typography
                variant='h3'
                sx={{
                  fontSize: '0.96rem',
                  lineHeight: 1.2,
                  mb: 0.75,
                }}
              >
                {group.title}
              </Typography>
            ) : null}
            <Stack component='ul' spacing={0.75} sx={{ m: 0, pl: 2.5 }}>
              {group.items.map((spice, index) => (
                <Typography
                  component='li'
                  key={`${spice}-${index}`}
                  color='text.secondary'
                >
                  {spice}
                </Typography>
              ))}
            </Stack>
          </Box>
        ))}
      </Stack>
    </Paper>
  );
}
