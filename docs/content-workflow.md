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
public/images/recipes/poke-bowl-z-szarpana-wolowina.png
```

The image filename should match the recipe slug and always use `.png`.
Make sure the `image` field in frontmatter matches the real filename:

```yaml
image: poke-bowl-z-szarpana-wolowina.png
```

Recommended image size:

```txt
1600 x 1200 px
```

Aim for roughly `200-500 KB` per image when possible.

## Language Rule

User-facing cookbook content should be in Polish:

- recipe titles,
- recipe descriptions,
- categories and tags,
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
category: Obiad
cuisine: Nowoczesna domowa
tags:
  - miska
  - wołowina
difficulty: medium
prepTime: 25
cookTime:
bakeTime:
bakeTemperature:
restTime:
servings: 4
image: poke-bowl-z-szarpana-wolowina.png
publishedAt: "2026-06-12"
---
```

## What Each Field Does

- `title`: shown on recipe pages, cards, and search results.
- `slug`: must match the markdown filename and image filename.
- `description`: short summary for cards and previews.
- `category`: used for browsing and filtering.
- `cuisine`: adds context and can become a filter later.
- `tags`: used for search, chips, related recipes, and filtering.
- `difficulty`: expected values for now: `easy`, `medium`, or `slow`; the UI maps these to Polish labels.
- `prepTime`, `cookTime`, `restTime`: optional numbers in minutes. Empty or `0` values are not shown.
- `bakeTime`: optional baking time in minutes.
- `bakeTemperature`: optional oven temperature, for example `180°C`.
- `servings`: optional serving count. Empty or `0` values are not shown.
- `image`: single PNG recipe image from `public/images/recipes/`.
- `publishedAt`: date in `YYYY-MM-DD` format.

## Writing Guidelines

- Keep ingredients scannable and include amounts when possible.
- Put seasonings in `## Przyprawy`, separate from `## Składniki`.
- Write instructions as clear numbered actions.
- Add practical notes after cooking the recipe.

## Publishing Checklist

Before committing a new recipe:

- The markdown file is in `recipes/`.
- The image exists in `public/images/recipes/[slug].[ext]`.
- The markdown filename, `slug`, and image filename match.
- The `image` field matches the real image file.
- Frontmatter fields are filled in intentionally.
- Ingredients, spices, and instructions are not left as template placeholders.
- `npm run build` passes.

## After Adding A Recipe

For now, generated Markdown recipes are ready for the upcoming content loader.
The current prototype still uses `src/data/recipes.ts`. The next implementation
step is to load recipes from `recipes/*.md` and feed them into the existing UI.
