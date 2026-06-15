import CalendarMonthIcon from '@mui/icons-material/CalendarMonth';
import HourglassBottomIcon from '@mui/icons-material/HourglassBottom';
import RestaurantMenuIcon from '@mui/icons-material/RestaurantMenu';
import ThermostatIcon from '@mui/icons-material/Thermostat';
import TimerOutlinedIcon from '@mui/icons-material/TimerOutlined';
import { Box, Card, CardActionArea, Chip, Stack, Typography } from '@mui/material';
import Link from 'next/link';
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

export function RecipeCard({ recipe }: { recipe: Recipe }) {
  const bakingLabel = getBakingLabel(recipe);
  const totalTime = getTotalTime(recipe);
  const passiveTimeLabel = getPassiveTimeLabel(recipe);

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
        href={`/przepisy/${recipe.slug}`}
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
              display: 'flex',
              flexWrap: 'wrap',
              alignItems: 'flex-start',
              columnGap: 2.25,
              rowGap: 0.85,
              mt: 'auto',
              pt: 2.25,
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
                icon={<HourglassBottomIcon fontSize='small' color='action' />}
              >
                {passiveTimeLabel}
              </RecipeMetaItem>
            ) : null}
            {recipe.servings ? (
              <RecipeMetaItem
                icon={<RestaurantMenuIcon fontSize='small' color='action' />}
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
        </Box>
      </CardActionArea>
    </Card>
  );
}
