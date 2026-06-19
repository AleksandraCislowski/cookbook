# Personal Cookbook

Personal Cookbook is a React and MUI application for collecting, browsing, and
cooking from a private recipe library. Recipes are stored as Markdown files, so
new meals can be added without touching application code: create a recipe file,
add frontmatter, place photos in the matching image folder, and the app turns it
into a polished, searchable cookbook.

## Product Goal

The project should feel like a real kitchen companion rather than a static recipe
archive. It should make it easy to save everyday meals, family favorites,
seasonal ideas, baking notes, quick lunches, party menus, and recipes worth
returning to.

The application will focus on:

- fast browsing across categories, cuisines, seasons, and occasions,
- rich recipe pages with photos, ingredients, steps, notes, and variations,
- powerful filtering by time, dietary notes, and ingredients,
- a comfortable cooking mode for reading steps in the kitchen,
- Markdown-based content that can grow naturally over time,
- reusable templates that make every new recipe consistent,
- a beautiful interface built with React, TypeScript, and MUI.

## Content Model

Each recipe will live in `content/recipes` as a Markdown file with frontmatter.
Images will live in a matching folder under `public/images/recipes`.

Example:

```md
---
title: Lemon Ricotta Pancakes
slug: lemon-ricotta-pancakes
description: Fluffy pancakes with lemon zest and creamy ricotta.
category: breakfast, weekend
cuisine: modern
prepTime: 10
cookTime: 15
servings: 4
image: hero.jpg
---

## Ingredients

- 250 g ricotta
- 2 eggs
- 180 ml milk

## Instructions

1. Whisk the wet ingredients.
2. Fold in the dry ingredients.
3. Cook on a lightly buttered pan.

## Notes

Add blueberries directly to the pan for a fruitier version.
```

## Planned Features

- home view with featured recipes, quick filters, and recently added meals,
- recipe index with search, sorting, categories, and visual recipe cards,
- recipe detail page with hero image, metadata, ingredients, steps, notes, and
  related recipes,
- cooking mode with large step text, timers, servings scaling, and sticky
  progress,
- recipe templates for meals, baking, sauces, drinks, preserves, and menu ideas,
- `npm run new-recipe` for creating matching Markdown files and image folders,
- a clear content workflow so recipes and images stay consistent,
- favorites and collections,
- shopping list generation from selected recipes,
- responsive design that works well on desktop, tablet, and phone.

## Technology Direction

- React with TypeScript
- MUI for the component system and theme
- Markdown with frontmatter for recipe content
- A local content loader that converts recipe files into typed data
- Playwright for the most important flows once the app shell exists

See [ROADMAP.md](./ROADMAP.md) for the broader roadmap,
[PROGRAMMING_PLAN.md](./PROGRAMMING_PLAN.md) for the practical build plan, and
[docs/content-workflow.md](./docs/content-workflow.md) for adding recipes.
