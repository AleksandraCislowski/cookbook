import { Box, Card, CardActionArea, Chip, Stack, Typography } from '@mui/material';
import Link from 'next/link';
import { RecipeImage } from '@/components/RecipeImage';
import { RecipeMetaList } from '@/components/RecipeMetaList';
import type { Recipe } from '@/data/recipes';
import { difficultyLabels } from '@/utils/recipeDisplay';

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
          '& .MuiCardActionArea-focusHighlight': {
            display: 'none',
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
          <Stack
            direction='row'
            spacing={1}
            alignItems='center'
            sx={{ mb: 1.65 }}
          >
            <Chip
              size='small'
              label={recipe.category}
              color='primary'
              variant='outlined'
            />
            <Chip
              size='small'
              label={difficultyLabels[recipe.difficulty]}
              variant='outlined'
            />
          </Stack>
          <Typography
            variant='h3'
            sx={{
              display: '-webkit-box',
              minHeight: 48,
              overflow: 'hidden',
              fontSize: '1.05rem',
              lineHeight: 1.2,
              mb: 0.75,
              WebkitBoxOrient: 'vertical',
              WebkitLineClamp: 2,
            }}
          >
            {recipe.title}
          </Typography>
          <Typography
            color='text.secondary'
            sx={{
              minHeight: 76,
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
