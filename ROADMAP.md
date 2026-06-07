# Roadmap: Personal Cookbook

## Working Principles

This project is a personal cookbook that should stay easy to extend for years.
The code should make adding recipes feel calm and predictable: Markdown files for
content, reusable templates for structure, image folders for photos, and clear
content conventions so new recipes stay consistent.

A good daily commit:

- delivers one complete change,
- keeps content, styling, and logic changes easy to review,
- includes a clear manual verification note,
- uses an intention-revealing message, such as `feat: add recipe index`,
- reaches GitHub only after the relevant checks pass.

All repository content should be written in English, including code, comments,
documentation, branch names, and commit messages. Recipe content can later be
written in Polish, English, or both if the content model supports language.

## Proposed Product

Working name: **Personal Cookbook**.

Core user flow:

1. The user opens a beautiful recipe library.
2. The user searches or filters recipes by category, tag, time, difficulty,
   cuisine, season, ingredient, or occasion.
3. The user opens a recipe with photos, metadata, ingredients, instructions,
   notes, variations, and related recipes.
4. The user switches to cooking mode with large readable steps, timers, and
   servings scaling.
5. The user adds a new Markdown recipe using a template and places photos in the
   matching image folder.
6. The app reads the recipe and automatically includes it in the cookbook.

## Proposed Technology Stack

- React with TypeScript
- MUI for layout, theme, components, icons, and responsive UI
- Vite or Next.js, finalized during project setup
- Markdown with frontmatter for recipes
- `gray-matter` or an equivalent parser for frontmatter
- `remark`/`rehype` tooling for safe Markdown rendering
- Playwright for critical browsing and cooking-mode flows
- GitHub Actions for building and type checking

The first implementation should avoid unnecessary backend complexity. Recipe
content can be static at build time until editing from the browser becomes a real
requirement.

## MVP Definition

The MVP is complete when the app can load Markdown recipes, read their
frontmatter, display a responsive recipe index, open a polished recipe detail
page, and provide a comfortable cooking mode. It should include at least five
sample recipes, one reusable recipe template, and documentation for adding a new
recipe with images.

## Suggested Project Structure

```txt
content/
  recipes/
    lemon-ricotta-pancakes.md
  templates/
    meal.md
    baking.md
public/
  images/
    recipes/
      lemon-ricotta-pancakes/
        hero.jpg
src/
  app/
  components/
  content/
  features/
    recipes/
  theme/
```

## Programming Plan

### Phase 1: Product Foundation

1. Align repository naming, documentation, and metadata with the cookbook
   concept.
2. Initialize the React, TypeScript, and MUI application.
3. Add core scripts, and basic CI.
4. Create the MUI theme with typography, spacing, color tokens, and responsive
   layout rules.
5. Build the base app shell with navigation, search entry point, and empty
   states.

Outcome: the repository has a real app skeleton and a clear product identity.

### Phase 2: Recipe Content System

1. Define the recipe frontmatter schema.
2. Add Markdown parsing and typed recipe loading.
3. Add clear required-field handling for recipe metadata.
4. Add sample recipes and matching image folders.
5. Add recipe templates for everyday meals, baking, sauces, drinks, preserves,
   and menu ideas.

Outcome: recipes can be added as Markdown files without changing UI code.

### Phase 3: Recipe Library Experience

1. Build recipe cards with image, title, tags, timing, difficulty, and category.
2. Add the recipe index grid with responsive behavior.
3. Add search across title, description, tags, ingredients, and notes.
4. Add filters for category, cuisine, difficulty, time, season, dietary notes,
   and occasion.
5. Add sorting by newest, fastest, easiest, title, and favorites.

Outcome: the cookbook becomes useful once it contains more than a few recipes.

### Phase 4: Recipe Detail Page

1. Build the recipe hero with the primary photo and key metadata.
2. Render ingredients, instructions, notes, variations, and storage tips.
3. Add servings scaling for ingredient amounts where possible.
4. Add related recipes based on tags, category, and shared ingredients.
5. Add print-friendly styling.

Outcome: each recipe page feels complete, readable, and worth saving.

### Phase 5: Cooking Mode

1. Add a distraction-free cooking view.
2. Display one step at a time with large readable text.
3. Add step navigation, progress, and screen-awake friendly layout.
4. Add timers attached to steps.
5. Add quick access to ingredients while cooking.

Outcome: the app works in the kitchen, not only while browsing on a laptop.

### Phase 6: Personal Organization

1. Add favorites.
2. Add collections, such as weekly dinners, baking ideas, party food, and comfort
   meals.
3. Add menu planning for selected dates or occasions.
4. Generate a shopping list from selected recipes.
5. Allow ingredients to be checked off and grouped by section.

Outcome: the cookbook becomes a planning tool, not only an archive.

### Phase 7: Quality, Content Tooling, and Polish

1. Add manual checks for recipe parsing, filters, and search.
2. Add a manual smoke-check flow for browsing, opening a recipe, and using cooking mode.
3. Add a script that creates a new recipe from a selected template.
4. Document checks for missing images, duplicate slugs, and incomplete frontmatter.
5. Refine responsive layout, accessibility, loading states, and error states.

Outcome: adding recipes stays safe as the library grows.

### Phase 8: Portfolio-Ready Presentation

1. Add screenshots and setup instructions to the README.
2. Document the recipe schema and image conventions.
3. Add an architecture note explaining the Markdown content pipeline.
4. Deploy the app.
5. Tag the first release and write release notes.

Outcome: the project is easy to understand, run, evaluate, and maintain.

## Recipe Frontmatter Draft

```yaml
title: Lemon Ricotta Pancakes
slug: lemon-ricotta-pancakes
description: Fluffy pancakes with lemon zest and creamy ricotta.
category: breakfast
cuisine: modern
tags:
  - sweet
  - weekend
  - vegetarian
difficulty: easy
prepTime: 10
cookTime: 15
restTime: 0
servings: 4
season:
  - spring
occasion:
  - weekend breakfast
dietary:
  - vegetarian
image: hero.jpg
gallery:
  - batter.jpg
  - plated.jpg
source:
  name: Family notes
  url:
publishedAt: 2026-06-06
updatedAt: 2026-06-06
```

## Backlog Ideas

- bilingual recipe content,
- recipe import from pasted text,
- pantry mode based on ingredients already at home,
- automatic unit conversion,
- nutrition notes,
- seasonal calendar,
- holiday menu builder,
- photo gallery per recipe,
- "cook again" history and personal ratings,
- private notes for adjustments after each attempt,
- offline support for cooking without reliable internet.

## Weekly Rhythm

Suggested weekly rhythm:

- Monday: one product or data model change,
- Tuesday: parsing, content workflow, or manual checks,
- Wednesday: interface and responsive behavior,
- Thursday: integration, edge cases, or content tooling,
- Friday: polish, documentation, accessibility, or a focused refactor.

Before each week, create a small set of issues with acceptance criteria. The
project should grow through useful, reviewable changes rather than large unclear
rewrites.
