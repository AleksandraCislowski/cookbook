import {
  Box,
  Card,
  CardActionArea,
  Chip,
  Stack,
  Typography,
} from '@mui/material';
import Link from 'next/link';
import { RecipeImage } from '@/components/RecipeImage';
import { RecipeMetaList } from '@/components/RecipeMetaList';
import type { Recipe } from '@/data/recipes';

export function RecipeCard({ recipe }: { recipe: Recipe }) {
  return (
    <Card
      variant='outlined'
      sx={{
        height: '100%',
        overflow: 'hidden',
        borderColor: 'app.border',
      }}
    >
      <CardActionArea
        component={Link}
        href={`/recipes/${recipe.slug}`}
        sx={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'stretch',
          height: '100%',
          '&.Mui-focusVisible': {
            outline: '3px solid',
            outlineColor: 'primary.main',
            outlineOffset: -3,
          },
        }}
      >
        <Box sx={{ flexShrink: 0 }}>
          <RecipeImage recipe={recipe} />
        </Box>
        <Box
          sx={{
            display: 'flex',
            flex: 1,
            flexDirection: 'column',
            minHeight: 260,
            p: 2.5,
          }}
        >
          <Stack direction='row' flexWrap='wrap' gap={1} sx={{ mb: 1.65 }}>
            {recipe.categories.map((category) => (
              <Chip
                key={category}
                size='small'
                label={category}
                color='primary'
                variant='outlined'
              />
            ))}
          </Stack>
          <Typography
            variant='h3'
            sx={{
              display: '-webkit-box',
              minHeight: 56,
              overflow: 'hidden',
              fontSize: '1.08rem',
              fontWeight: 700,
              lineHeight: 1.25,
              mb: 0.75,
              WebkitBoxOrient: 'vertical',
              WebkitLineClamp: 2,
              letterSpacing: '0.01em',
            }}
          >
            {recipe.title}
          </Typography>
          <Typography
            variant='body2'
            color='text.secondary'
            sx={{
              display: '-webkit-box',
              minHeight: 70,
              overflow: 'hidden',
              WebkitBoxOrient: 'vertical',
              WebkitLineClamp: 3,
              lineHeight: 1.55,
              letterSpacing: '0.01em',
            }}
          >
            {recipe.description}
          </Typography>
          <Box
            sx={{
              mt: 'auto',
              pt: 2.25,
            }}
          >
            <RecipeMetaList recipe={recipe} />
          </Box>
        </Box>
      </CardActionArea>
    </Card>
  );
}
