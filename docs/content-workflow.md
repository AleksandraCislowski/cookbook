# Content Workflow

This guide is for adding recipes to the cookbook.

## Create A New Recipe

Run:

```bash
npm run new-recipe -- "Recipe Name"
```

Example:

```bash
npm run new-recipe -- "Poke bowl z szarpaną wołowiną"
```

This creates:

```txt
recipes/poke-bowl-z-szarpana-wolowina.md
```

The recipe file is generated from `templates/recipe-template.md`.

## Add The Image

Each recipe uses one image. Add it here:

```txt
public/images/recipes/poke-bowl-z-szarpana-wolowina.jpg
```

The image filename should match the recipe slug. Add the source image as PNG,
JPG, HEIC, WebP, or AVIF, then optimize it:

```bash
npm run optimize-recipe-image -- poke-bowl-z-szarpana-wolowina
```

The optimizer writes `[slug].jpg`, updates the recipe frontmatter, and removes
the source image after a successful conversion. Use `--keep-source` only when
you intentionally want to keep the original file.

To optimize a few newly added recipes before committing, pass all their slugs:

```bash
npm run optimize-recipe-image -- poke-bowl-z-szarpana-wolowina tiramisu-matcha makaron-z-pesto
```

To regenerate every recipe image:

```bash
npm run optimize-recipe-image -- --all
```

Make sure the `image` field in frontmatter matches the real filename:

```yaml
image: poke-bowl-z-szarpana-wolowina.jpg
```

Recommended image size:

```txt
1200 x 900 px
```

Aim for roughly `200-500 KB` per image when possible.

## Language Rule

User-facing cookbook content should be in Polish:

- recipe titles,
- recipe descriptions,
- categories,
- ingredients,
- instructions,
- notes,
- UI copy.

Technical docs, scripts, filenames, and internal field names can stay in English.
Slugs and image filenames should not use Polish characters because they are used
in paths and URLs.

## Fill In Frontmatter

Every recipe should include:

```yaml
---
title: "Poke bowl z szarpaną wołowiną"
slug: poke-bowl-z-szarpana-wolowina
description: Kolorowa miska z ryżem, soczystą szarpaną wołowiną i warzywami.
category: Obiad, Szybkie
cuisine: Nowoczesna domowa
prepTime: 25
cookTime:
bakeTime:
bakeTemperature:
restTime:
servings: 4
image: poke-bowl-z-szarpana-wolowina.jpg
publishedAt: "2026-06-12T11:57:00+02:00"
---
```

## What Each Field Does

- `title`: shown on recipe pages, cards, and search results.
- `slug`: must match the markdown filename and image filename.
- `description`: short summary for cards and previews.
- `category`: one or more categories used for browsing and filtering. Separate multiple categories with commas, for example `Obiad, Szybkie`.
- `cuisine`: adds context and can become a filter later.
- `prepTime`, `cookTime`, `restTime`: optional numbers in minutes. Empty or `0` values are not shown.
- `bakeTime`: optional baking time in minutes.
- `bakeTemperature`: optional oven temperature, for example `180°C`.
- `servings`: optional serving count. Empty or `0` values are not shown.
- `image`: optimized recipe image from `public/images/recipes/`, usually `[slug].jpg`.
- `publishedAt`: publication date and time in ISO format, for example `YYYY-MM-DDTHH:mm:ss+02:00`. The time keeps newest-first sorting predictable when multiple recipes are added on the same day.

## Writing Guidelines

- When adding or updating recipes, follow the structure, wording, metadata, and appliance program conventions of comparable recipes already in the cookbook.
- The user uses one Ninja Cooker for slow cooking, air frying, and its other cooking functions. Always add the existing `Ninja Cooker` category when a recipe uses a slow cooker, air fryer, or another function of that appliance. Follow existing recipes for program names and time fields; for slow cooking, use `passiveTime` in minutes, `passiveTimeLabel: Slow Cook (wolnowar)`, and the program and duration in the instructions (for example, `Slow Cook Low (4h)`). Keep the new recipe's own cooking times and temperatures.
- Before assigning categories, check the categories already used in `recipes/*.md`. Use only existing category names and add all that fit the ingredients and preparation, including dietary and equipment categories such as `Z mięsem`, `Vege`, `Proteinowe`, and `Blender`. Do not invent new categories without the user's instruction.
- `Vege` means a meat-free dish in this cookbook. Do not add it to desserts solely because they contain no meat.
- Identify the cuisine from the dish and its preparation, using existing cuisine names. Do not leave the template's `Domowa` value automatically; use it only when it fits. For modern adaptations without a clear national cuisine, use `Nowoczesna` when appropriate.
- Keep ingredients scannable and include amounts when possible.
- When the user changes ingredients, reread the current recipe file and update its description, instructions, and notes to match. Remove references to deleted ingredients and techniques that depend on them; do not restore ingredients from an older version.
- Put seasonings in `## Przyprawy`, separate from `## Składniki`.
- Write instructions as clear numbered actions.
- Do not include oven-preheating instructions. Give the baking duration and temperature only in the baking step, for example `Piecz 30 minut w 180°C`.
- Do not repeat ingredient quantities in the instructions; amounts belong in the ingredient list. When an ingredient appears in multiple components, refer to its role (for example, eggs for the dough or filling). Keep cooking times, temperatures, appliance settings, and necessary portioning directions in the instructions.
- Add practical notes after cooking the recipe.
- Write `## Notatki` as full sentences in plain paragraphs. Do not use bulleted or numbered lists in this section, because the recipe view does not display them.

## Publishing Checklist

Before committing a new recipe:

- The markdown file is in `recipes/`.
- The image exists in `public/images/recipes/[slug].[ext]`.
- The markdown filename, `slug`, and image filename match.
- The `image` field matches the real image file.
- New images were optimized with `npm run optimize-recipe-image -- [slug]`.
- Frontmatter fields are filled in intentionally.
- Ingredients, spices, and instructions are not left as template placeholders.
- `npm run build` passes.

## After Adding A Recipe

For now, generated Markdown recipes are ready for the upcoming content loader.
The current prototype still uses `src/data/recipes.ts`. The next implementation
step is to load recipes from `recipes/*.md` and feed them into the existing UI.
