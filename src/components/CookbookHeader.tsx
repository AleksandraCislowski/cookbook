'use client';

import CalendarMonthIcon from '@mui/icons-material/CalendarMonth';
import MenuBookIcon from '@mui/icons-material/MenuBook';
import { Box, Button, Container, Stack, Typography } from '@mui/material';
import { alpha } from '@mui/material/styles';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { RECIPE_LOGO_SRC } from '@/components/RecipeImage';

export function CookbookHeader() {
  const pathname = usePathname();
  const isMealPlanPage = pathname === '/plan-tygodnia';

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
          justifyContent='space-between'
          sx={{
            minHeight: { xs: 70, sm: 82, md: 96 },
            py: { xs: 0.75, md: 1 },
          }}
        >
          <Stack
            direction='row'
            spacing={{ xs: 0.75, sm: 1.25 }}
            alignItems='center'
            sx={{ minWidth: 0 }}
          >
            <Box
              component={Link}
              href='/'
              sx={{
                position: 'relative',
                width: { xs: 72, sm: 96, md: 132 },
                height: { xs: 58, sm: 72, md: 84 },
                flexShrink: 0,
                color: 'inherit',
                textDecoration: 'none',
              }}
            >
              <Box
                component='img'
                src={RECIPE_LOGO_SRC}
                alt='Logo domowej książki kucharskiej'
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
            <Box
              component={Link}
              href='/'
              sx={{ minWidth: 0, color: 'inherit', textDecoration: 'none' }}
            >
              <Typography
                variant='h1'
                sx={{
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
          </Stack>
          <Stack
            component='nav'
            direction='row'
            spacing={1}
            alignItems='center'
            sx={{ flexShrink: 0 }}
          >
            <Button
              component={Link}
              href='/'
              variant={isMealPlanPage ? 'outlined' : 'contained'}
              startIcon={<MenuBookIcon />}
              sx={{
                minWidth: { xs: 44, sm: 0 },
                px: { xs: 1, sm: 2 },
                '& .MuiButton-startIcon': { mr: { xs: 0, sm: 1 } },
              }}
            >
              <Box
                component='span'
                sx={{ display: { xs: 'none', sm: 'inline' } }}
              >
                Przepisy
              </Box>
            </Button>
            <Button
              component={Link}
              href='/plan-tygodnia'
              variant={isMealPlanPage ? 'contained' : 'outlined'}
              startIcon={<CalendarMonthIcon />}
              sx={{
                minWidth: { xs: 44, sm: 0 },
                px: { xs: 1, sm: 2 },
                '& .MuiButton-startIcon': { mr: { xs: 0, sm: 1 } },
              }}
            >
              <Box
                component='span'
                sx={{ display: { xs: 'none', sm: 'inline' } }}
              >
                Plan tygodnia
              </Box>
            </Button>
          </Stack>
        </Stack>
      </Container>
    </Box>
  );
}
