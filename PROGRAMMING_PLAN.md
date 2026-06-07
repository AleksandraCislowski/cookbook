# Programming Plan: Personal Cookbook

## Purpose

This document is the practical build plan for the cookbook application. It turns
the broader roadmap into concrete programming steps that can be picked up one by
one. The goal is to build a beautiful, fast, and useful personal recipe book
where recipes are added as Markdown files with photos.

## Product Direction

The app should feel like a polished private cookbook:

- easy to browse when looking for inspiration,
- fast to search when looking for a specific recipe,
- comfortable to use in the kitchen,
- simple to extend by adding Markdown files and images,
- structured enough to keep recipe metadata easy to fill in,
- visually rich without becoming difficult to maintain.

## Technical Decisions For The First Version

- Use React with TypeScript.
- Use MUI for the component system, theme, layout primitives, icons, and forms.
- Use Markdown files with frontmatter for recipes.
- Keep recipes static at build time for the first version.
- Use a small content loading layer that exposes typed recipe objects to the UI.

Open decision:

- Choose Vite or Next.js during setup. If image optimization, file-based routes,
  and static generation matter most, choose Next.js. If a simpler client app is
  enough, choose Vite.

Recommended first choice: **Next.js**, because it fits Markdown content,
generated recipe pages, image handling, and future deployment well.

## Milestone 1: App Foundation

Goal: create a working application shell with the right stack and project
structure.

Tasks:

1. Initialize the app with React, TypeScript, and the selected build framework.
2. Install and configure MUI.
3. Add base scripts: `dev`, `build`, and `typecheck`.
4. Add formatting conventions.
5. Add the base folder structure:

```txt
content/
  recipes/
  templates/
public/
  images/
    recipes/
src/
  app/
  components/
  content/
  features/
    recipes/
  theme/
```

6. Create the main layout with navigation, content width rules, and responsive
   behavior.
7. Add the initial MUI theme.

Done when:

- the app starts locally,
- the app builds successfully,
- a basic page renders with the cookbook name and navigation,
- theme tokens are used instead of random one-off styles.

## Milestone 2: Recipe Content Model

Goal: make recipes load from Markdown files predictably.

Tasks:

1. Define the recipe frontmatter schema.
2. Create TypeScript types for recipe metadata and recipe content.
3. Add Markdown parsing with frontmatter extraction.
4. Add clear fallback handling for missing optional metadata.
5. Document how to avoid duplicate slugs.
6. Document how image folders and file names should match recipes.
7. Create at least five sample recipes.
8. Create reusable templates:

- everyday meal,
- baking,
- sauce or dressing,
- drink,
- preserves,
- menu idea.

Done when:

- recipe metadata is easy to review manually,
- valid recipes become typed objects,
- adding a new recipe requires only a Markdown file and images.

## Milestone 3: Recipe Library

Goal: build the main browsing experience.

Tasks:

1. Create recipe cards with image, title, description, tags, time, difficulty,
   and category.
2. Build the recipe grid.
3. Add search across title, description, tags, ingredients, and notes.
4. Add filters:

- category,
- cuisine,
- difficulty,
- max cooking time,
- season,
- dietary notes,
- occasion,
- ingredient.

5. Add sorting:

- newest,
- title,
- fastest,
- easiest,
- recently updated.

6. Add empty states for no results and no recipes.
7. Persist search and filter state in the URL if the framework makes it simple.

Done when:

- the cookbook is pleasant to browse on desktop and mobile,
- filters can narrow a growing recipe library,
- no-result states help the user recover.

## Milestone 4: Recipe Detail Page

Goal: make each recipe page complete and beautiful.

Tasks:

1. Create a recipe route by slug.
2. Build the hero section with image, title, description, and key metadata.
3. Render ingredients, instructions, notes, variations, and storage tips.
4. Add a servings control.
5. Add related recipes based on tags, category, cuisine, or ingredients.
6. Add print styles.
7. Add image gallery support.

Done when:

- recipe pages are readable and polished,
- the page works well on phone, tablet, and desktop,
- print output is clean enough to use in the kitchen.

## Milestone 5: Cooking Mode

Goal: make the app useful while actually cooking.

Tasks:

1. Add a cooking mode entry point from recipe detail.
2. Show one step at a time with large readable text.
3. Add previous and next step controls.
4. Show progress through the recipe.
5. Keep ingredients accessible while cooking.
6. Add timers for steps that include time information.
7. Add a screen-friendly layout with high contrast and large tap targets.

Done when:

- cooking mode can be used comfortably on a phone,
- the user can move through steps without losing context,
- ingredients and timers are available without clutter.

## Milestone 6: Personal Organization

Goal: turn the cookbook into a planning tool.

Tasks:

1. Add favorites.
2. Add custom collections.
3. Add menu planning.
4. Generate a shopping list from selected recipes.
5. Group shopping list items by section.
6. Add check-off behavior for shopping items.

Done when:

- recipes can be saved and grouped,
- several recipes can produce one useful shopping list,
- personal planning features do not require a backend yet.

## Milestone 7: Tooling And Polish

Goal: make the project comfortable to grow without adding a heavy testing setup.

Tasks:

1. Add a script for creating a recipe from a template.
2. Add documentation for the recipe workflow.
3. Add a publishing checklist for new recipes.
4. Add manual smoke-check steps for browsing, searching, opening a recipe, and entering cooking mode.
5. Keep CI focused on building and type checking.
6. Refine responsive layout, accessibility, loading states, and error states.

Done when:

- adding recipes remains low-friction,
- the manual checklist is clear enough to follow,
- the app still builds cleanly after new content is added.

## First Five Programming Sessions

### Session 1: Project Setup

- Initialize the framework.
- Install MUI.
- Add scripts and base configuration.
- Render the first app shell.

### Session 2: Theme And Layout

- Build the theme.
- Add navigation.
- Add responsive content layout.
- Create first shared UI primitives.

### Session 3: Markdown Content Pipeline

- Add recipe schema.
- Add Markdown parsing.
- Load sample recipe data.

### Session 4: Recipe Index

- Build recipe cards.
- Render the recipe grid.
- Add basic search.
- Add empty states.

### Session 5: Recipe Detail

- Add recipe slug page.
- Render metadata, ingredients, and instructions.
- Add hero image handling.
- Add the first related recipes section.

## Content Rules

Every recipe should have:

- a unique `slug`,
- a clear `title`,
- a short `description`,
- a `category`,
- at least one `tag`,
- `difficulty`,
- `prepTime`,
- `cookTime`,
- `servings`,
- a main `image`,
- ingredients,
- instructions.

Images should live in:

```txt
public/images/recipes/<recipe-slug>/
```

The main image should usually be named:

```txt
hero.jpg
```

## Design Notes

- The first screen should be the actual cookbook, not a marketing landing page.
- Prioritize useful browsing, strong search, and readable recipe pages.
- Use photos as the main visual texture.
- Keep controls familiar: search field, filters, chips, menus, icon buttons,
  toggles, and clear primary actions.
- Make mobile layouts excellent, because the app will often be used in the
  kitchen.
- Avoid decorative UI that gets in the way of reading recipes.

## Near-Term Backlog

- Decide framework: Next.js or Vite.
- Create initial app.
- Create theme direction.
- Add recipe schema.
- Add sample recipes.
- Add templates.
- Add recipe index.
- Add recipe detail.
- Add cooking mode.
- Add the recipe creation script.
