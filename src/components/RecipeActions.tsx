'use client';

import { useMemo, useState } from 'react';
import CloseIcon from '@mui/icons-material/Close';
import ContentCopyIcon from '@mui/icons-material/ContentCopy';
import LocalGroceryStoreIcon from '@mui/icons-material/LocalGroceryStore';
import PrintIcon from '@mui/icons-material/Print';
import {
  Button,
  Checkbox,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Divider,
  FormControlLabel,
  IconButton,
  Snackbar,
  Stack,
  Tooltip,
  Typography,
} from '@mui/material';
import { CookingMode } from '@/components/CookingMode';
import type { Recipe } from '@/data/recipes';

type RecipeActionsProps = {
  ingredientGroups?: Recipe['ingredientGroups'];
  printTitle?: string;
  spiceGroups?: Recipe['spiceGroups'];
  steps?: string[];
};

type ShoppingListItem = {
  groupTitle: string;
  id: string;
  label: string;
};

function escapeHtml(value: string) {
  return value
    .replaceAll('&', '&amp;')
    .replaceAll('<', '&lt;')
    .replaceAll('>', '&gt;');
}

function getShoppingListItems(
  ingredientGroups: Recipe['ingredientGroups'],
  spiceGroups: Recipe['spiceGroups'],
) {
  return [
    ...ingredientGroups.flatMap((group, groupIndex) =>
      group.items.map((item, itemIndex) => ({
        groupTitle: group.title,
        id: `ingredient-${groupIndex}-${itemIndex}`,
        label: item,
      })),
    ),
    ...spiceGroups.flatMap((group, groupIndex) =>
      group.items.map((spice, spiceIndex) => ({
        groupTitle: group.title ? `Przyprawy: ${group.title}` : 'Przyprawy',
        id: `spice-${groupIndex}-${spiceIndex}`,
        label: spice,
      })),
    ),
  ];
}

function getShoppingListText(
  items: ShoppingListItem[],
  selectedItemIds: string[],
  printTitle?: string,
) {
  const lines = [
    printTitle ? `Lista zakupów: ${printTitle}` : 'Lista zakupów',
    '',
  ];
  const selectedItems = items.filter((item) => selectedItemIds.includes(item.id));

  selectedItems.forEach((item, index) => {
    const previousItem = selectedItems[index - 1];

    if (item.groupTitle && item.groupTitle !== previousItem?.groupTitle) {
      if (index > 0) {
        lines.push('');
      }

      lines.push(item.groupTitle);
    }

    lines.push(`- ${item.label}`);
  });

  return lines.join('\n').trim();
}

export function RecipeActions({
  ingredientGroups = [],
  printTitle,
  spiceGroups = [],
  steps = [],
}: RecipeActionsProps) {
  const [shoppingListOpen, setShoppingListOpen] = useState(false);
  const [copyMessageOpen, setCopyMessageOpen] = useState(false);
  const visibleSpices = useMemo(
    () => spiceGroups.flatMap((group) => group.items),
    [spiceGroups],
  );
  const shoppingListItems = useMemo(
    () => getShoppingListItems(ingredientGroups, spiceGroups),
    [ingredientGroups, spiceGroups],
  );
  const [selectedItemIds, setSelectedItemIds] = useState<string[]>(() =>
    shoppingListItems.map((item) => item.id),
  );
  const shoppingListText = useMemo(
    () => getShoppingListText(shoppingListItems, selectedItemIds, printTitle),
    [printTitle, selectedItemIds, shoppingListItems],
  );
  const selectedItemCount = selectedItemIds.length;

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

  async function copyShoppingList() {
    if (navigator.clipboard) {
      await navigator.clipboard.writeText(shoppingListText);
      setCopyMessageOpen(true);
    }
  }

  function openShoppingList() {
    setSelectedItemIds(shoppingListItems.map((item) => item.id));
    setShoppingListOpen(true);
  }

  function toggleShoppingListItem(itemId: string) {
    setSelectedItemIds((currentItemIds) =>
      currentItemIds.includes(itemId)
        ? currentItemIds.filter((currentItemId) => currentItemId !== itemId)
        : [...currentItemIds, itemId],
    );
  }

  function selectAllShoppingListItems() {
    setSelectedItemIds(shoppingListItems.map((item) => item.id));
  }

  function clearShoppingListItems() {
    setSelectedItemIds([]);
  }

  function printShoppingList() {
    const printWindow = window.open('', '_blank', 'width=720,height=900');

    if (!printWindow) {
      return;
    }

    const escapedTitle = escapeHtml(printTitle ?? 'Lista zakupów');
    const selectedItems = shoppingListItems.filter((item) =>
      selectedItemIds.includes(item.id),
    );
    const listHtml = selectedItems
      .map((item, index) => {
        const previousItem = selectedItems[index - 1];
        const heading =
          item.groupTitle && item.groupTitle !== previousItem?.groupTitle
            ? `<h2>${escapeHtml(item.groupTitle)}</h2>`
            : '';
        const label = escapeHtml(item.label);

        return `${heading}<label><span></span>${label}</label>`;
      })
      .join('');

    printWindow.document.write(`
      <!doctype html>
      <html>
        <head>
          <title>${escapedTitle}</title>
          <style>
            body {
              margin: 24mm;
              color: #172033;
              font-family: ui-sans-serif, system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", sans-serif;
            }
            h1 {
              margin: 0 0 10mm;
              font-family: Georgia, "Times New Roman", serif;
              font-size: 24pt;
            }
            h2 {
              margin: 8mm 0 3mm;
              font-size: 12pt;
            }
            label {
              display: flex;
              gap: 3mm;
              align-items: flex-start;
              margin: 0 0 3mm;
              font-size: 11pt;
              line-height: 1.35;
            }
            span {
              width: 4mm;
              height: 4mm;
              flex: 0 0 4mm;
              border: 1px solid #172033;
              margin-top: 0.5mm;
            }
          </style>
        </head>
        <body>
          <h1>${escapedTitle}</h1>
          ${listHtml}
        </body>
      </html>
    `);
    printWindow.document.close();
    printWindow.focus();
    printWindow.print();
  }

  return (
    <>
      <Stack direction='row' spacing={0.5} alignItems='center'>
        <CookingMode
          ingredientGroups={ingredientGroups}
          recipeTitle={printTitle ?? 'Przepis'}
          spices={visibleSpices}
          steps={steps}
        />
        <Tooltip title='Drukuj przepis'>
          <IconButton
            aria-label='Drukuj przepis'
            color='primary'
            size='small'
            onClick={printRecipe}
          >
            <PrintIcon fontSize='small' />
          </IconButton>
        </Tooltip>
        <Tooltip title='Lista zakupów'>
          <IconButton
            aria-label='Lista zakupów'
            color='primary'
            size='small'
            onClick={openShoppingList}
          >
            <LocalGroceryStoreIcon fontSize='small' />
          </IconButton>
        </Tooltip>
      </Stack>

      <Dialog
        open={shoppingListOpen}
        onClose={() => setShoppingListOpen(false)}
        fullWidth
        maxWidth='sm'
      >
        <DialogTitle sx={{ pr: 6 }}>Lista zakupów</DialogTitle>
        <IconButton
          aria-label='Zamknij listę zakupów'
          onClick={() => setShoppingListOpen(false)}
          sx={{
            position: 'absolute',
            right: 8,
            top: 8,
          }}
        >
          <CloseIcon />
        </IconButton>
        <DialogContent dividers>
          <Stack spacing={2}>
            <Stack direction='row' spacing={1} flexWrap='wrap' gap={1}>
              <Button size='small' onClick={selectAllShoppingListItems}>
                Zaznacz wszystko
              </Button>
              <Button size='small' onClick={clearShoppingListItems}>
                Odznacz wszystko
              </Button>
              <Typography
                variant='body2'
                color='text.secondary'
                sx={{ alignSelf: 'center' }}
              >
                Wybrano {selectedItemCount} z {shoppingListItems.length}
              </Typography>
            </Stack>

            {shoppingListItems.map((item, index) => (
              <Stack key={item.id} spacing={0.25}>
                {item.groupTitle &&
                item.groupTitle !== shoppingListItems[index - 1]?.groupTitle ? (
                  <>
                    {index > 0 ? <Divider sx={{ my: 0.5 }} /> : null}
                    <Typography fontWeight={800}>{item.groupTitle}</Typography>
                  </>
                ) : null}
                <FormControlLabel
                  control={
                    <Checkbox
                      checked={selectedItemIds.includes(item.id)}
                      onChange={() => toggleShoppingListItem(item.id)}
                    />
                  }
                  label={item.label}
                />
              </Stack>
            ))}
          </Stack>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setShoppingListOpen(false)}>Zamknij</Button>
          <Button
            startIcon={<PrintIcon />}
            disabled={selectedItemCount === 0}
            onClick={printShoppingList}
          >
            Drukuj
          </Button>
          <Button
            variant='contained'
            startIcon={<ContentCopyIcon />}
            disabled={selectedItemCount === 0}
            onClick={copyShoppingList}
          >
            Kopiuj zaznaczone
          </Button>
        </DialogActions>
      </Dialog>

      <Snackbar
        open={copyMessageOpen}
        autoHideDuration={2500}
        message='Lista zakupów skopiowana'
        onClose={() => setCopyMessageOpen(false)}
      />
    </>
  );
}
