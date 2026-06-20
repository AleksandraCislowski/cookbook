'use client';

import { Box, Container, Stack, Typography } from '@mui/material';
import { alpha } from '@mui/material/styles';
import Link from 'next/link';
import { RECIPE_LOGO_SRC } from '@/components/RecipeImage';

export function CookbookHeader() {
  return (
    <Box
      component='header'
      sx={{
        borderBottom: '1px solid',
        borderColor: 'app.border',
        backgroundColor: (theme) => alpha(theme.palette.background.paper, 0.9),
        backdropFilter: 'blur(18px)',
        overflow: 'visible',
      }}
    >
      <Container maxWidth='xl' sx={{ position: 'relative' }}>
        <Stack
          direction='row'
          spacing={{ xs: 1, md: 1.75 }}
          alignItems='center'
          justifyContent='flex-start'
          sx={{
            minHeight: { xs: 70, sm: 82, md: 96 },
            py: { xs: 0.75, md: 1 },
          }}
        >
          <Box
            component={Link}
            href='/'
            aria-label='Przejdź do strony głównej'
            sx={{
              display: 'flex',
              alignItems: 'center',
              minWidth: 0,
              gap: { xs: 0.75, sm: 1.25 },
              color: 'inherit',
              textDecoration: 'none',
            }}
          >
            <Box
              sx={{
                position: 'relative',
                width: { xs: 72, sm: 96, md: 132 },
                height: { xs: 58, sm: 72, md: 84 },
                flexShrink: 0,
              }}
            >
              <Box
                component='img'
                src={RECIPE_LOGO_SRC}
                alt=''
                sx={{
                  position: 'absolute',
                  top: { xs: -16, sm: -22, md: -32 },
                  left: 0,
                  width: { xs: 72, sm: 96, md: 132 },
                  height: { xs: 92, sm: 124, md: 166 },
                  display: 'block',
                  objectFit: 'contain',
                }}
              />
            </Box>
            <Box sx={{ minWidth: 0 }}>
              <Typography
                component='span'
                variant='h1'
                sx={{
                  display: 'block',
                  fontSize: { xs: '1.05rem', sm: '1.25rem', md: '1.55rem' },
                  lineHeight: { xs: 1, sm: 1.05 },
                  overflowWrap: 'anywhere',
                }}
              >
                Kącik Kulinarny Aleksandry
              </Typography>
              <Typography
                variant='body2'
                color='text.secondary'
                sx={{
                  display: { xs: 'none', sm: 'block' },
                  lineHeight: 1.25,
                }}
              >
                Prywatna książka kucharska z przepisami, zdjęciami i notatkami.
              </Typography>
            </Box>
          </Box>
        </Stack>
      </Container>
    </Box>
  );
}
