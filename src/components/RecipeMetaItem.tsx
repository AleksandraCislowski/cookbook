import type { ReactNode } from 'react';
import { Box, Typography } from '@mui/material';

type RecipeMetaItemProps = {
  children: ReactNode;
  icon: ReactNode;
};

export function RecipeMetaItem({ icon, children }: RecipeMetaItemProps) {
  return (
    <Box
      sx={{
        display: 'inline-flex',
        alignItems: 'flex-start',
        gap: 0.45,
        minWidth: 0,
        maxWidth: '100%',
      }}
    >
      <Box
        sx={{
          display: 'flex',
          alignItems: 'center',
          flexShrink: 0,
          minHeight: 20,
        }}
      >
        {icon}
      </Box>
      <Typography
        variant='body2'
        sx={{
          minWidth: 0,
          lineHeight: 1.4,
          overflowWrap: 'anywhere',
          textAlign: 'left',
          whiteSpace: 'normal',
        }}
      >
        {children}
      </Typography>
    </Box>
  );
}
