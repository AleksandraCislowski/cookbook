'use client';

import LocalGroceryStoreIcon from '@mui/icons-material/LocalGroceryStore';
import PrintIcon from '@mui/icons-material/Print';
import { IconButton, Stack, Tooltip } from '@mui/material';

export function RecipeActions() {
  return (
    <Stack direction='row' spacing={0.5} alignItems='center'>
      <Tooltip title='Drukuj menu'>
        <IconButton
          aria-label='Drukuj menu'
          size='small'
          onClick={() => window.print()}
        >
          <PrintIcon fontSize='small' />
        </IconButton>
      </Tooltip>
      <Tooltip title='Lista zakupów'>
        <IconButton aria-label='Lista zakupów' size='small'>
          <LocalGroceryStoreIcon fontSize='small' />
        </IconButton>
      </Tooltip>
    </Stack>
  );
}
