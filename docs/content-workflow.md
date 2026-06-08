# Content Workflow

This guide is for adding recipes to Personal Cookbook.

## Create A New Recipe

Run:

```bash
npm run new-recipe -- "Recipe Name"
```

Example:

```bash
npm run new-recipe -- "Lemon Pasta"
```

This creates:

```txt
recipes/lemon-pasta.md
public/images/recipes/lemon-pasta/
```

The recipe file is generated from `templates/recipe-template.md`.

## Add Images

Add images to the generated folder:

```txt
public/images/recipes/lemon-pasta/
```

The generated template expects names like:

```txt
lemon-pasta1.jpg
lemon-pasta2.jpg
lemon-pasta3.jpg
```

The main image must match the `image` field in frontmatter:

```yaml
image: lemon-pasta1.jpg
```

Gallery images should use only file names:

```yaml
gallery:
  - lemon-pasta2.jpg
  - lemon-pasta3.jpg
```

When markdown body images are added later, they should also use only the file
name. The app will resolve images from `public/images/recipes/[recipe-slug]/`.

## Fill In Frontmatter

Every recipe should include:

```yaml
---
title: "Lemon Pasta"
slug: lemon-pasta
description: A short, useful summary for cards, search, and previews.
category: Dinner
cuisine: Italian-inspired
tags:
  - weeknight
  - vegetarian
difficulty: easy
prepTime: 10
cookTime: 15
restTime: 0
servings: 2
image: lemon-pasta1.jpg
gallery:
  - lemon-pasta2.jpg
source:
  name: Personal notes
  url:
publishedAt: "2026-06-08"
updatedAt: "2026-06-08"
---
```

## What Each Field Does

- `title`: Used on recipe pages, cards, and search results.
- `slug`: Must match the markdown file name and image folder name.
- `description`: Used on cards and previews.
- `category`: Used for browsing and filtering.
- `cuisine`: Adds context and can become a filter later.
- `tags`: Used for search, chips, related recipes, and filtering.
- `difficulty`: Expected values for now: `easy`, `medium`, or `slow`.
- `prepTime`, `cookTime`, `restTime`: Numbers in minutes.
- `servings`: Default serving count.
- `image`: Main recipe image file from the recipe image folder.
- `gallery`: Optional extra image file names.
- `source.name`, `source.url`: Where the recipe came from, if useful.
- `publishedAt`, `updatedAt`: Dates in `YYYY-MM-DD` format.

## Writing Guidelines

- Keep ingredients scannable and include amounts when possible.
- Write instructions as clear numbered actions.
- Add practical notes after cooking the recipe.
- Use variations for swaps, seasonal versions, or pantry shortcuts.
- Keep storage notes simple and realistic.

## Publishing Checklist

Before committing a new recipe:

- The markdown file is in `recipes/`.
- The image folder exists in `public/images/recipes/[recipe-slug]/`.
- The markdown file name, `slug`, and image folder name match.
- The main image listed in `image` exists.
- Gallery image file names exist if listed.
- Frontmatter fields are filled in intentionally.
- Ingredients and instructions are not left as template placeholders.
- `npm run build` passes.

## After Adding A Recipe

For now, generated Markdown recipes are ready for the upcoming content loader.
The current prototype still uses `src/data/recipes.ts`. The next implementation
step is to load recipes from `recipes/*.md` and feed them into the existing UI.
