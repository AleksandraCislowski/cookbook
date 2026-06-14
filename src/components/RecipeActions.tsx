'use client';

import LocalGroceryStoreIcon from '@mui/icons-material/LocalGroceryStore';
import PrintIcon from '@mui/icons-material/Print';
import { IconButton, Stack, Tooltip } from '@mui/material';

type RecipeActionsProps = {
  printTitle?: string;
};

export function RecipeActions({ printTitle }: RecipeActionsProps) {
  function printRecipe() {
    const originalTitle = document.title;

    if (printTitle) {
      document.title = printTitle;
    }

    window.print();

    window.setTimeout(() => {
      document.title = originalTitle;
    }, 500);
  }

  return (
    <Stack direction='row' spacing={0.5} alignItems='center'>
      <Tooltip title='Drukuj przepis'>
        <IconButton
          aria-label='Drukuj przepis'
          size='small'
          onClick={printRecipe}
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
